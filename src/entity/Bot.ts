import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, OneToMany} from "typeorm";
import {BotKeys} from "../interfaces/BotKeys";
import {ItemRequest} from "./ItemRequest";

@Entity('bots')
export class Bot extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: number;

    @Column()
    password: number;

    @Column()
    display_name: number;

    @Column("double")
    market_money: number;

    @Column()
    sentry: string;

    @Column()
    steam_id: string;

    @Column()
    avatar_url: string;

    @Column()
    trade_url: string;

    @Column()
    last_activity: number;

    @Column({type: "json", readonly: true})
    keys: BotKeys;

    @Column()
    market_key: string;

    @Column()
    status: string;

    @OneToMany(type => ItemRequest, itemRequest => itemRequest.bot)
    @JoinColumn({name: "id", referencedColumnName: "bot_id"})
    item_requests: ItemRequest[]
}