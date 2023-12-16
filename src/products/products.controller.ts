import { Controller, Post, Body, Get, Patch, Param, Query, Delete, UseGuards, Request } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SellerGuard } from 'src/authorization/seller.guard';
@UseGuards(JwtAuthGuard, SellerGuard)
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService){}
    @Post()
    createProduct(@Body() body: CreateProductDto){
        this.productsService.create(body.name, body.imageUrl, parseInt(body.price))
    }

    @Get("/:id")
    findProduct(@Param('id') id: string){
        return this.productsService.findOne(parseInt(id));
    }

    @Get()
    findAllProducts(@Request() req, @Query('name') name: string){
        console.log(req.user)
        return this.productsService.find(name);
    }

    @Patch("/:id")
    updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto){
        return this.productsService.update(parseInt(id), body)
    }

    @Delete("/:id")
    removeProduct(@Param('id') id: string){
        return this.productsService.remove(parseInt(id))
    }
}
