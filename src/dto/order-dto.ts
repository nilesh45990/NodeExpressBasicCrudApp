import { OrderStatus } from "../util/order-status";
import { OrderLineDto } from './order-line-dto';
import { Address } from "./address";

export class OrderDto {
    id: number;
    customerId: number;
    status: OrderStatus;
    date: Date = new Date();
}