import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User> ){}
    create(email: string, password: string){
        const user = this.repo.create({email, password}); //this just creates and instance of user
        return this.repo.save(user); //this saves in the database
    }

    findById(id: number){
        const user = this.repo.findOneBy({id})
        if (!user){
            throw new NotFoundException("User not found")
        }
        return user
    }

    findByEmail(email: string): Promise<User> | undefined{
        const user = this.repo.findOneBy({email: email})
        if (!user){
            throw new NotFoundException("User not found")
        }
        return user
    }
}
