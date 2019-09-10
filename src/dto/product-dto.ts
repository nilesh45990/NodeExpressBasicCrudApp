import { type } from "os";

export class ProductDto {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    createdBy: number;
    createdDate: Date;
    updatedBy: number;
    updatedDate: Date;
}