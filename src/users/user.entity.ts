import { Role } from "src/enums/role.enum";
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
    role: Role
    @AfterInsert()
    logInsert(){
        console.log(`Signed up user with id ${this.id}`)
    }
}