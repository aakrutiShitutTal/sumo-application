import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from "class-validator";
export class CreateOrderItemDto {
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    qty: string;
}