import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderItem } from 'src/orderItems/order-item.entity';
import { CreateOrderItemDto } from 'src/orderItems/dtos/create-orderItem.dto';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private repo: Repository<Order>, @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>, private productsService: ProductsService){}
    async create(orderDto: CreateOrderDto, user: User){
        console.log(orderDto);
        const {orderItems, ...orderDetails} = orderDto
        const order = this.repo.create(orderDetails)
        order.orderItems = await Promise.all(orderItems.map(async (orderItemDto) => {
            const generatedOrderItem = await this.processOrderItem(orderItemDto)
            const orderItem = this.orderItemRepo.create(generatedOrderItem);
            orderItem.order = order;
            return orderItem;
        }))
        order.user = user;
        this.repo.save(order);
        order.orderItems.map(
            async (orderItem) => {
                await this.orderItemRepo.save(orderItem);
                const newQty = orderItem.product.qty - orderItem.qty
                await this.productsService.updateQty(orderItem.product.id, newQty)
            }
        )
    }
    async find(user: User | null = null){
        if (user) {
            return await this.repo.find({where: {user}}) // this will list order for consumer. Consumer's user id will be present in order
        }else {
            return await this.repo.find() //this will be used by admin
        }
    }

    async findOne(id: number,user: User | null = null){
        let order;
        if(user){
            order = await this.repo.findOneBy({id, user: user})
        }else{
            order = await this.repo.findOneBy({id})
        }
        if(!order){
            throw new NotFoundException("Product not found")
        }
        return order
    }

    async processOrderItem(orderItemDto: CreateOrderItemDto ): Promise<OrderItem>{
        let orderItem = new OrderItem;
        const {qty, productId} = orderItemDto
        const product = await this.productsService.findOne(parseInt(productId));
        console.log(product)
        if(!product){
            throw new NotFoundException(`Product with id - ${productId} not found`)
        }
        orderItem.product = product
        if(qty){
            const intQty = parseInt(qty)
            if(product.qty < intQty){
                throw new BadRequestException(`Product with id - ${productId} has only ${product.qty} items`)
            }
            orderItem.qty = intQty
        }
        return orderItem;
    }
    //try to add cancel functionality
}
