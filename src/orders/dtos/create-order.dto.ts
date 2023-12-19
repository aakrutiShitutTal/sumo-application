import { IsArray, IsNotEmpty } from "class-validator";
import { CreateOrderItemDto } from "src/orderItems/dtos/create-orderItem.dto";
export class CreateOrderDto {
    @IsNotEmpty()
    date: string;

    // orderItems: CreateOrderItemDto[];
    @IsArray()
    orderItems: CreateOrderItemDto[];
}