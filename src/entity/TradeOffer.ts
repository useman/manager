import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import {ITradeItems} from "../interfaces/ITradeItems";
import {ItemRequest} from "./ItemRequest";
import {TradeOfferState} from "../enums/TradeOfferState";

@Entity('trade_offers')
export class TradeOffer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    request_id: number;

    @Column({nullable: true})
    trade_id: number;

    @Column("json", {nullable: true})
    items_to_give: ITradeItems;

    @Column("json", {nullable: true})
    items_to_receive: ITradeItems;

    @Column()
    is_our_offer: boolean;

    @Column()
    state: TradeOfferState;

    @Column({ type: "timestamp" })
    created_at: Date;

    @Column({ type: "timestamp" })
    updated_at: Date;

    @OneToOne(type => ItemRequest, itemRequest => itemRequest.trade_offer)
    @JoinColumn({name: "request_id", referencedColumnName: "id"})
    item_request: ItemRequest;
}