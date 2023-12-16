import { IsString, IsOptional, IsNumber } from "class-validator";
export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name: string;
    @IsString()
    @IsOptional()
    imageUrl: string;
    @IsNumber()
    @IsOptional()
    price: number; // discuss this
}