import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import {ITradeItems} from "../interfaces/ITradeItems";
import {RequestBotStatus} from "../enums/RequestBotStatus";
import {RequestMarketStatus} from "../enums/RequestMarketStatus";
import {Prize} from "./Prize";
import {Bot} from "./Bot";
import {TradeOffer} from "./TradeOffer";

@Entity('item_requests')
export class ItemRequest extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    bot_id: number;

    @Column()
    prize_id: number;

    @Column("double", {nullable: true})
    real_price: number;

    @Column({nullable: true})
    opskins_item_id: number;

    @Column({nullable: true})
    trade_id_receive: number;

    @Column({nullable: true})
    trade_id_sent: number;

    @Column("json", {nullable: true})
    items_received: ITradeItems;

    @Column({"default": 0})
    market_tries: number;

    @Column({"default": 0})
    bot_tries: number;

    @Column()
    market_status: RequestMarketStatus;

    @Column()
    bot_status: RequestBotStatus;

    @Column({ type: "timestamp" })
    created_at: Date;

    @Column({ type: "timestamp" })
    updated_at: Date;

    @OneToOne(type => Prize, prize => prize.item_request)
    @JoinColumn({name: "prize_id"})
    prize: Prize;

    @OneToOne(type => Bot, bot => bot.item_requests)
    @JoinColumn({name: "bot_id", referencedColumnName: "id"})
    bot: Bot;

    @OneToOne(type => TradeOffer, tradeOffer => tradeOffer.item_request)
    @JoinColumn({name: "id", referencedColumnName: "request_id"})
    trade_offer: TradeOffer
}