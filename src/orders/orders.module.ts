import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AdminOrdersController} from './admin/adminOrders.controller';
import { ConsumerOrdersController } from './consumer/consumerOrders.controller';
import { Order } from './order.entity';
import { OrderItem } from 'src/orderItems/order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), ProductsModule],
  providers: [OrdersService],
  controllers: [AdminOrdersController, ConsumerOrdersController]
})
export class OrdersModule {}
