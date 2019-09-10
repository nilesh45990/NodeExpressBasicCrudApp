import { OrderLineDto } from '../dto/order-line-dto';
import { Address } from '../dto/address';

export class OrderReportDto {
    private _orderId: number;
    private _shippingAddress: Address;
    private _items: OrderLineDto[];
    private _totalAmount: number = 0;
    public get orderId(): number {
        return this._orderId;
    }
    public set orderId(orderId: number) {
        this._orderId = orderId;
    }
    public get orderLines(): OrderLineDto[] {
        return this._items;
    }
    public set orderLines(orderLines: OrderLineDto[]) {
        this._items = orderLines;
    }
    public get totalAmount(): number {
        return this._totalAmount;
    }
    public set totalAmount(totalAmount: number) {
        this._totalAmount = totalAmount;
    }
    public get shippingAddress(): Address {
        return this._shippingAddress;
    }
    public set shippingAddress(shippingAddress: Address) {
        this._shippingAddress = shippingAddress;
    }

}