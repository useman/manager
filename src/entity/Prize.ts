import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import {User} from "./User";
import {Item} from "./Item";
import {PrizeStatus} from "../enums/PrizeStatus";
import {ItemRequest} from "./ItemRequest";

@Entity('prizes')
export class Prize extends BaseEntity {


    @PrimaryGeneratedColumn()
    prize_id: number;

    @Column()
    user_id: number;

    @Column()
    open_box_id: number;

    @Column()
    item_id: number;

    @Column({ type: "timestamp" })
    created_at: Date;

    @Column({ type: "timestamp" })
    updated_at: Date;

    @Column({"enum": PrizeStatus})
    status: PrizeStatus;

    @OneToOne(type => User)
    @JoinColumn({name: "user_id"})
    user: User;

    @OneToOne(type => Item)
    @JoinColumn({name: "item_id"})
    item: Item;

    @OneToOne(type => ItemRequest, itemRequest => itemRequest.prize)
    item_request: ItemRequest
}