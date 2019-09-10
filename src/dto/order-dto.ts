import { OrderStatus } from "../util/order-status";
import { OrderLineDto } from './order-line-dto';
import { Address } from "./address";

export class OrderDto {
    private _id: number;
    private _type: string;
    private _customerId: number;
    private _status: OrderStatus ;
    private _date: Date = new Date();
    // private _staffId: number;
    // private _orderLines: OrderLine[];
    // private _billingAddress: Address;
    // private _shippingAddress: Address;

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    public get type(): string {
        return this._type;
    }

    public set type(type: string) {
        this._type = type;
    }
    public get customerId(): number {
        return this._customerId;
    }

    public set customerId(customerId: number) {
        this._customerId = customerId;
    }

    public get status(): OrderStatus {
        return this._status;
    }

    public set status(status: OrderStatus) {
        this._status = status;
    }

    public get date(): Date {
        return this._date;
    }

    public set date(date: Date) {
        this._date = date;
    }

    // public get billingAddress(): Address {
    //     return this._billingAddress;
    // }
    // public set billingAddress(address: Address) {
    //     this._billingAddress = address;
    // }

    // public get shippingAddress(): Address {
    //     return this._shippingAddress;
    // }
    // public set shippingAddress(address: Address) {
    //     this._shippingAddress = address;
    // }

    // public get staffId(): number {
    //     return this._staffId;
    // }

    // public set staffId(staffId: number) {
    //     this._staffId = staffId;
    // }

    // public get orderLines(): OrderLine[] {
    //     return this._orderLines;
    // }

    // public set orderLines(orderLines: OrderLine[]) {
    //     this._orderLines = orderLines;
    // }

}