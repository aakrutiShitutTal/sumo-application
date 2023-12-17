import { OrderItem } from "src/orderItems/order-item.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @ManyToOne(() => User, (user) => user.orders)
    user: User

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems: OrderItem

}