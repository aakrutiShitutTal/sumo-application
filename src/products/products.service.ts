import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { User } from 'src/users/user.entity';
import { use } from 'passport';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private repo: Repository<Product> ){}
    async create(productDto: CreateProductDto, user: User){
        const product = this.repo.create(this.processProduct(productDto))
        product.user = user
        return await this.repo.save(product)
    }

    async findOne(id: number, user: User | null = null){
        let product;
        if(user){
            product = await this.repo.findOneBy({id, user})
        }else{
            product = await this.repo.findOneBy({id})
        }
        if(!product){
            throw new NotFoundException("Product not found")
        }
        return product
    }

    find(name: string, user: User | null = null){
        if (user) {
            return this.repo.find({where: {name, user}})
        }else {
            return this.repo.find({where: {name}})
        }
    }

    async update(id: number, attrs: Partial<UpdateProductDto>, user: User | null = null){
        const product = await this.findOne(id, user)
        Object.assign(product, this.processProduct(attrs));
        return await this.repo.save(product);
    }

    async remove(id: number, user: User | null = null){
        const product = await this.findOne(id, user)
        return await this.repo.remove(product);
    }

    private processProduct(productDto: CreateProductDto | Partial<UpdateProductDto>): Partial<Product>{
        const {price, qty, ...restProduct} = productDto

        const prod: Partial<Product> = { ...restProduct}
        if (price){
            prod.price = parseInt(price)
        }
        if(qty){
            prod.qty = parseInt(qty)
        }
        return prod;
    }
}
