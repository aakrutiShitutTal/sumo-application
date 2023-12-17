import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeInsert} from "typeorm"
import { User } from "src/users/user.entity";
import { BadRequestException } from "@nestjs/common";

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

    @BeforeInsert()
    validateUser(product){
        if (this.user.role !== 1) {
        throw new BadRequestException('Only seller can own products');
        }
    }
}