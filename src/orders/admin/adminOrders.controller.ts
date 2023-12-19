import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from '../orders.service';
import { AdminGuard } from 'src/authorization/admin.guard';

@UseGuards(AdminGuard)
@Controller('admin/orders')
export class AdminOrdersController {
    constructor(private ordersService: OrdersService){}
    @Get()
    async findAllOrders(){
        return await this.ordersService.find();
    }

    @Get("/:id")
    async findOneOrder(@Param('id') id: string){
        return await this.ordersService.findOne(parseInt(id));
    }
}
