import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    steam_id: string;

    @Column()
    steam_name: string;

    @Column("double", { "default": 0 })
    balance: number;

    @Column("double", { "default": 0 })
    total_funds: number;

    @Column()
    name: string;

    @Column({ "default": "default" })
    group_id: string;

    @Column({ "default": false })
    is_fake: boolean;

    @Column({ "default": false })
    is_admin: boolean;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    steam_avatar: string;

    @Column({ "default": false })
    can_get_items: boolean;

    @Column()
    trade_url: string;

    @Column("double",  { "default": 0 })
    referral_funds: string;

    @Column({ nullable: true })
    invite_code: string;

    @Column({ nullable: true })
    invite_user_id: number;

    @Column()
    remember_token: string;

    @Column({ type: "timestamp" })
    created_at: Date;

    @Column({ type: "timestamp" })
    updated_at: Date;
}
