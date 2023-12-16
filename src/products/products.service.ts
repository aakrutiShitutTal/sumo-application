import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private repo: Repository<Product> ){}
    create(name: string, imageUrl: string, price: number){
        const product = this.repo.create({name, imageUrl, price})
        return this.repo.save(product)
    }
    findOne(id: number){
        return this.repo.findOneBy({id})
    }
    find(prodName: string){
        return this.repo.find({where: {name: prodName}})
    }
    async update(id: number, attrs: Partial<Product>){
        const product = await this.findOne(id)
        if (!product){
            throw new NotFoundException("Product not found")
        }
        Object.assign(product, attrs);
        return this.repo.save(product);
    }
    async remove(id: number){
        const product = await this.findOne(id)
        if (!product){
            throw new NotFoundException("Product not found")
        }
        return this.repo.remove(product);
    }
}
