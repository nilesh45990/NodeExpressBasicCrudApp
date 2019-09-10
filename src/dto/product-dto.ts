import { type } from "os";

export class ProductDto {
    private _id: number;
    private _type: string;
    private _name: string;
    private _description: string;
    // private _companyId: number;
    // private _categoryId: number;
    private _price: number;
    private _image: string;

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

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public set description(description: string) {
        this._description = description;
    }

    public get description(): string {
        return this._description;
    }

    public set image(image: string) {
        this._image = image;
    }

    public get image(): string {
        return this._image;
    }

    // public get companyId(): number {
    //     return this._companyId;
    // }

    // public set companyId(companyId: number) {
    //     this._companyId = companyId;
    // }

    // public get categoryId(): number {
    //     return this._categoryId;
    // }

    // public set categoryId(categoryId: number) {
    //     this._categoryId = categoryId;
    // }

    public get price(): number {
        return this._price;
    }
    public set price(price: number) {
        this._price = price;
    }




}