import {AfterInsert, Entity, Column, PrimaryGeneratedColumn} from "typeorm"

// enum UserRole {
//     USER = 1,
//     ADMIN = 2
// }
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    // @Column("enum", { enum: UserRole })
    @Column({default: 0})
    role: number
    @AfterInsert()
    logInsert(){
        console.log(`Signed up user with id ${this.id}`)
    }
}