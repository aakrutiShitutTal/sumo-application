import {AfterInsert, Entity, Column, PrimaryGeneratedColumn} from "typeorm"
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @AfterInsert()
    logInsert(){
        console.log(`Signed up user with id ${this.id}`)
    }
}