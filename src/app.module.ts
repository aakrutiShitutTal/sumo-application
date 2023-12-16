import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { AuthModule } from './auth/auth.module';
import { LocalJwtModule } from 'src/jwt/local-jwt.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "sqlite",
    database: "db.sqlite",
    entities: [User, Product],
    synchronize: true
  }),UsersModule, ProductsModule, AuthModule, LocalJwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
