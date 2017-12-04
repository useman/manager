import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, getConnection} from "typeorm";
import {NotificationType} from "../enums/NotificationType";
import {ItemRequest} from "./ItemRequest";

@Entity('notifications')
export class Notification extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    text: string;

    @Column("json", {nullable: true})
    data: Object;

    @Column({nullable: false})
    type: NotificationType;

    @Column({"default": false})
    notified: boolean;

    @Column({ type: "timestamp" })
    created_at: Date;

    @Column({ type: "timestamp", "default": "" })
    updated_at: Date;


    static async newBotNotEnoughMoney(item_request: ItemRequest) {
        let notification = new Notification();
        notification.type = NotificationType.BOT_NOT_ENOUGH_MONEY;
        notification.text = "Bot Not enough money";
        notification.data = {
            "request_id": item_request.id,
            "prize_id": item_request.prize_id,
            "name_hash": item_request.prize.item.name_hash,
            "price": item_request.prize.item.price,
        };
        notification.created_at = new Date;
        notification.updated_at = new Date;
        await notification.save();
    }

    static async newAllBotsIsOffline() {
        let notification = new Notification();
        notification.type = NotificationType.ALL_BOTS_IS_OFFLINE;
        notification.text = "All bots is offline";
        notification.data = {};
        notification.created_at = new Date;
        notification.updated_at = new Date;
        await notification.save();
    }
}