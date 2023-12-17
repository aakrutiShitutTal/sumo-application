import { Role } from "src/enums/role.enum";
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import { Product } from "src/products/product.entity";
import { Order } from "src/orders/order.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    phoneNo: string;

    @Column()
    password: string;

    @Column({default: 0})
    role: Role

    @OneToMany(() => Product, (product) => product.user)
    products: Product[];

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}