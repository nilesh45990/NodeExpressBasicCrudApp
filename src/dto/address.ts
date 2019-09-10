export class Address {
    
    private _id: number;
    private _customerId: number;
    private _type: string;
    private _line1: string;
    private _line2: string;
    private _city: string;
    private _state: string;
    private _country: string;

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    public get customerId(): number {
        return this._customerId;
    }
    public set customerId(customerId: number) {
        this._customerId = customerId;
    }
    public get type(): string {
        return this._type;
    }
    public set type(type: string) {
        this._type = type;
    }
    public get line1(): string {
        return this._line1;
    }
    public set line1(line1: string) {
        this._line1 = line1;
    }
    public get line2(): string {
        return this._line2;
    }
    public set line2(line2: string) {
        this._line2 = line2;
    }
    public get city(): string {
        return this._city;
    }
    public set city(city: string) {
        this._city = city;
    }
    public get state(): string {
        return this._state;
    }
    public set state(state: string) {
        this._state = state;
    }
    public get country(): string {
        return this._country;
    }
    public set country(country: string) {
        this._country = country;
    }
}