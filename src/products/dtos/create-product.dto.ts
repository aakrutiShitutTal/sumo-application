import { IsNumber, IsString } from "class-validator";
export class CreateProductDto {
    @IsString()
    name: string;
    @IsString()
    imageUrl: string;
    @IsNumber()
    price: string;
}