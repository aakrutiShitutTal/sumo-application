import { Module } from '@nestjs/common';
import { AdminProductsController } from './admin/adminProducts.controller';
import { SellerProductsController } from './seller/sellerProducts.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [AdminProductsController, SellerProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
