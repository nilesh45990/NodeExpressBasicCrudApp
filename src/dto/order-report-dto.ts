import { OrderLineDto } from '../dto/order-line-dto';
import { Address } from '../dto/address';

export class OrderReportDto {
    orderId: number;
    shippingAddress: Address;
    items: OrderLineDto[];
    totalAmount: number = 0;
}