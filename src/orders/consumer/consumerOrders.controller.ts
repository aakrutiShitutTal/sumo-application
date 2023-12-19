import { Controller, Post, Body, Get, Param, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from '../orders.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { RoleGuard } from 'src/authorization/role.guard';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('consumer/orders')
@UseGuards(JwtAuthGuard, new RoleGuard([Role.Consumer]))
export class ConsumerOrdersController {
    constructor(private ordersService: OrdersService){}
    @Get()
    async findAllOrders(@Request() req){
        return await this.ordersService.find(req.user);
    }

    @Get("/:id")
    async findOneOrder(@Param('id') id: string, @Request() req){
        return await this.ordersService.findOne(parseInt(id), req.user);
    }

    @Post()
    async createOrder(@Request() req,@Body() createOrderDto: CreateOrderDto){
        console.log(createOrderDto)
        return await this.ordersService.create(createOrderDto, req.user)
    }
}
