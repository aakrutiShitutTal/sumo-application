import { Controller, Post, Body, Get, Patch, Param, Query, Delete, UseGuards, Request } from '@nestjs/common';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductsService } from '../products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/authorization/admin.guard';
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/products')
export class AdminProductsController {
    constructor(private productsService: ProductsService){}

    @Get("/:id")
    async findProduct(@Param('id') id: string){
        return await this.productsService.findOne(parseInt(id));
    }

    @Get()
    findAllProducts(@Request() req, @Query('name') name: string){
        return this.productsService.find(name);
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
