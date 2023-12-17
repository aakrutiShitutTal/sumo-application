import { Controller, Post, Body, Get, Patch, Param, Query, Delete, UseGuards, Request } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductsService } from '../products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SellerGuard } from 'src/authorization/seller.guard';
@UseGuards(JwtAuthGuard, SellerGuard)
@Controller('seller/products')
export class SellerProductsController {
    constructor(private productsService: ProductsService){}
    @Post()
    async createProduct(@Body() userDto: CreateProductDto, @Request() req){
        return await this.productsService.create(userDto, req.user)
    }

    @Get("/:id")
    async findProduct(@Param('id') id: string, @Request() req){
        return await this.productsService.findOne(parseInt(id), req.user);
    }

    @Get()
    findAllProducts(@Request() req, @Query('name') name: string){
        return this.productsService.find(name, req.user);
    }

    @Patch("/:id")
    async updateProduct(@Param('id') id: string, @Body() body: Partial<UpdateProductDto>){
        return await this.productsService.update(parseInt(id), body)
    }

    @Delete("/:id")
    async removeProduct(@Param('id') id: string){
        return await this.productsService.remove(parseInt(id))
    }
}
