export class OrderLineDto {
    private _id: number;
    private _type: string;
    private _productId: number;
    private _productName: string;
    private _quantity: number;
    private _customerId: number;
    private _orderId: number;

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
    public get orderId(): number {
        return this._orderId;
    }
    public set orderId(orderId: number) {
        this._orderId = orderId;
    }
    public get productName(): string {
        return this._productName;
    }
    public set productName(productName: string) {
        this._productName = productName;
    }
    public get productId(): number {
        return this._productId;
    }
    public set productId(productId: number) {
        this._productId = productId;
    }
    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(quantity: number) {
        this._quantity = quantity;
    }
    public get customerId(): number {
        return this._customerId;
    }
    public set customerId(customerId: number) {
        this._customerId = this.customerId;
    }

}