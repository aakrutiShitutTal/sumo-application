import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeInsert, OneToMany} from "typeorm"
import { User } from "src/users/user.entity";
import { BadRequestException } from "@nestjs/common";
import { OrderItem } from "src/orderItems/order-item.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    model: string;

    @Column()
    modelYear: string;

    @Column()
    size: string;

    @Column()
    qty: number;

    @Column()
    price: number

    @ManyToOne(() => User, (user) => user.products)
    user: User;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[]


    // @BeforeInsert()
    // validateUser(){
    //     if (this.user.role !== 1) {
    //     throw new BadRequestException('Only seller can own products');
    //     }
    //     return true;
    // }
}