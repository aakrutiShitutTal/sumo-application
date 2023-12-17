import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/order.entity';
import { OrderItem } from './orderItems/order-item.entity';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './filters/CustomException.filter';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'sumoapi',
    username: 'sumoapi_username',
    entities: [User, Product, Order, OrderItem],
    database: 'sumoapi',
    synchronize: true,
    logging: true,
  }),UsersModule, ProductsModule, AuthModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    }
  ],
})
export class AppModule {}
