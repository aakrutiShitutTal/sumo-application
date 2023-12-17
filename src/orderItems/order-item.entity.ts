import { Order } from "src/orders/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderItem{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    qty: number;

    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order
}