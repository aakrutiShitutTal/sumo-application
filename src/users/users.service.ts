import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User> ){}
    async create(userDto: Partial<CreateUserDto>){
        const user = this.repo.create(userDto);
        return await this.repo.save(user);
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
