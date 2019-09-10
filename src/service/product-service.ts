import { Request } from 'express';
import { ProductDto } from '../dto/product-dto';
import productDao from '../dao/product-dao';
import { GenericResponse, StatusCode } from '../util/generic-response';

class ProductService {

    async getAllProduct(): Promise<GenericResponse<ProductDto[]>> {
        try {
            const products: ProductDto[] = await productDao.getAllProduct();
            return new GenericResponse<ProductDto[]>().setResponse(products);
        } catch (error) {
            return new GenericResponse<ProductDto[]>().setCode(StatusCode.ERROR).setResponse(error);
        }
    }

    async getProductById(productId: number): Promise<GenericResponse<ProductDto[]>> {
        try {
            const products: ProductDto[] = await productDao.getProductById(productId);
            return new GenericResponse<ProductDto[]>().setResponse(products);
        } catch (error) {
            return new GenericResponse<ProductDto[]>().setCode(StatusCode.ERROR).setResponse(error);
        }
    }

    async saveProduct(req: Request): Promise<GenericResponse<ProductDto>> {
        try {
            // let productDto: ProductDto = <ProductDto>req.body;
            const products: ProductDto = await productDao.saveProduct(<ProductDto>req.body);
            return new GenericResponse<ProductDto>().setCode(StatusCode.CREATED).setResponse(products).setMessage("Product is added successfully!");
        } catch (error) {
            return new GenericResponse<ProductDto>().setCode(StatusCode.ERROR).setResponse(error);
        }
    }

    async updateProduct(req: Request): Promise<GenericResponse<ProductDto>> {
        try {
            // let productDto: ProductDto = <ProductDto>req.body;
            console.log('this is product id ', req.params.productId)
            const products: ProductDto = await productDao.updateProduct(+req.params.productId, <ProductDto>req.body);
            return new GenericResponse<ProductDto>().setCode(StatusCode.OK).setResponse(products).setMessage('Product is updated successfully!');
        } catch (error) {
            return new GenericResponse<ProductDto>().setCode(StatusCode.ERROR).setResponse(error);
        }
    }

    async deleteProduct(req: Request): Promise<GenericResponse<string>> {
        try {
            const message: string = await productDao.deleteProduct(+req.params.productId);
            return new GenericResponse<string>().setCode(StatusCode.NO_CONTENT).setMessage('Product is updated successfully!');
        } catch (error) {
            return new GenericResponse<string>().setCode(StatusCode.ERROR).setResponse(error);
        }
    }
}
export default new ProductService();