import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";

@Entity('items')
export class Item extends BaseEntity {

    @PrimaryGeneratedColumn()
    item_id: number;

    @Column()
    name_hash: number;

    @Column()
    type: number;

    @Column()
    name: number;

    @Column("double")
    price: number;

    @Column()
    rarity: string;

    @Column()
    quality: string;

    @Column()
    category: string;

    @Column()
    image_id: string;

    @Column({ type: "timestamp" })
    created_at: Date;

    @Column({ type: "timestamp" })
    updated_at: Date;

    @Column()
    sync: boolean;
}