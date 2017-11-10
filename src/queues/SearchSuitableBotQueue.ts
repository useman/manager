import Queue from "./Queue";
import {ItemRequest} from "../entity/ItemRequest";
import {RequestMarketStatus} from "../enums/RequestMarketStatus";
import {isUndefined} from "util";
import {Bot} from "../entity/Bot";
import {RequestBotStatus} from "../enums/RequestBotStatus";
import {TradeOfferState} from "../enums/TradeOfferState";
import {Notification} from "../entity/Notification";

/**
 * Max difference last activity to check online bot
 * @type {number}
 */
const MAX_DIFFERENCE_TIMESTAMP: number = 3000000; // (seconds)

const MULTIPLIER_PRIZE_PRICE: number = 1.2;
const SLEEP_NOT_ENOUGH_MONEY: number = 15000;

export class SearchSuitableBotQueue extends Queue {

    protected async work(step: Function): Promise<void> {

        const item_request = await ItemRequest
            .createQueryBuilder("item_request")
            .innerJoinAndSelect("item_request.prize", "prize")
            .innerJoinAndSelect("prize.user", "user")
            .innerJoinAndSelect("prize.item", "item")
            .where("item_request.bot_id IS NULL")
            .andWhere("item_request.market_status = :market_status",{market_status: RequestMarketStatus.AWAITING_ALLOCATION})
            .orderBy("item.price", "ASC")
            .getOne();


        if (isUndefined(item_request)) {
            step();
            return;
        }

        console.log("Start work prize#%s `%s` expected price $%s", item_request.prize_id, item_request.prize.item.name_hash, item_request.prize.item.price);

        const bots = await Bot
            .createQueryBuilder("bot")
            .leftJoinAndSelect("bot.item_requests","item_requests")
            .leftJoinAndSelect("item_requests.prize","prize")
            .leftJoinAndSelect("item_requests.trade_offer","trade_offer")
            .leftJoinAndSelect("prize.item","item")
            .leftJoinAndSelect("prize.user","user")
            .where("bot.last_activity > UNIX_TIMESTAMP() - :diff", {diff: MAX_DIFFERENCE_TIMESTAMP})
            //.andWhere("bot.market_money >= :prize_price", {prize_price: (item_request.prize.item.price * MULTIPLIER_PRIZE_PRICE) })
            .getMany();


        if (bots.length == 0) {
            console.warn("Error not found online bots");
            step();
            return;
        }

        let bots_enough_money_to_buy: Array<Bot> = [];

        for (let bot of bots) {

            if (bot.market_money >= (item_request.prize.item.price * MULTIPLIER_PRIZE_PRICE)) {
                bots_enough_money_to_buy.push(bot);
                continue;
            }

            console.log("Bot#%s `%s` (balance -> %s): not enough money to buy prize#%s `%s` expected price $%s -> with multiplier (%s): $%s ", bot.id, bot.login, bot.market_money,item_request.prize_id, item_request.prize.item.name_hash, item_request.prize.item.price, MULTIPLIER_PRIZE_PRICE,(item_request.prize.item.price * MULTIPLIER_PRIZE_PRICE));
        }


        if (bots_enough_money_to_buy.length == 0) {
            console.warn("Error all bots can't buy this prize#%s", item_request.prize_id);
            console.log("Sleep " + SLEEP_NOT_ENOUGH_MONEY + " seconds");
            await Notification.newBotNotEnoughMoney(item_request);
            setTimeout(() => {
                step();
            }, SLEEP_NOT_ENOUGH_MONEY);

            return;
        }

        bots_enough_money_to_buy.sort((a:Bot, b:Bot) => {

            const bots: Array<Bot> = [a,b];

            let bot_stats: { [key:string]: { score: number } } = {};

            for (let bot of bots) {

                if (!bot_stats.hasOwnProperty(bot.login)) {
                    bot_stats[bot.login] = {score: 0};
                }

                for (let item_request of bot.item_requests) {

                    if ([
                            RequestBotStatus.COMPLETE,
                            RequestBotStatus.EXPIRED ,
                            RequestBotStatus.COUNTERED,
                            RequestBotStatus.DECLINED ,
                            RequestBotStatus.INVALID_ITEMS ,
                            RequestBotStatus.CANCELED_BY_SECOND_FACTOR,
                            RequestBotStatus.CANCELED,
                            RequestBotStatus.INVALID
                        ].indexOf(item_request.bot_status) === -1) {

                        bot_stats[bot.login].score++;
                    }

                    if (!isUndefined(item_request.trade_offer)) {
                        if (item_request.trade_offer.state == TradeOfferState.ACTIVE) {
                            bot_stats[bot.login].score++;
                        }
                    }
                }
            }

            if (bot_stats[a.login].score < bot_stats[b.login].score) {
                return -1;
            }else{
                return 1;
            }
        });

        console.log("Item request#%s set bot#%s `%s` ", item_request.id, bots_enough_money_to_buy[0].id, bots_enough_money_to_buy[0].login);

        item_request.bot = bots_enough_money_to_buy[0];
        item_request.market_status = RequestMarketStatus.WAITING;
        await item_request.save();

        step();
    }

}