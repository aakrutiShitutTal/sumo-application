import { IsNumber, IsString } from "class-validator";
export class CreateProductDto {
    @IsString()
    name: string;
    @IsString()
    description: string
    @IsString()
    model: string
    @IsString()
    modelYear: string
    @IsString()
    size: string
    @IsString()
    qty
    @IsString()
    price: string;
}