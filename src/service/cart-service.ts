import { Request } from 'express';
import { Validator } from "class-validator";
import { ProductDto } from '../dto/product-dto';
import productDao from '../dao/product-dao';
import { GenericResponse, StatusCode } from '../util/generic-response';
import { OrderLineDto } from '../dto/order-line-dto';
import cartDao from '../dao/cart-dao';

class CartService {

    validator = new Validator();

    async getOrderLineByCustomer(request: Request): Promise<GenericResponse<OrderLineDto[]>> {
        try {
            const customerId: string = request.params.customerId;
            if (!this.validator.isNumberString(customerId)) {
                throw new Error('Please enter proper customer Id');
            }
            const products: OrderLineDto[] = await cartDao.getOrderLineByCustomer(+(customerId));
            return new GenericResponse<OrderLineDto[]>().setResponse(products);
        } catch (error) {
            return new GenericResponse<OrderLineDto[]>().setCode(StatusCode.ERROR).setResponse(error);
        }
    }

    async getProductDetail(request: Request): Promise<GenericResponse<ProductDto[]>> {
        try {
            const userId: string = request.params.userId;
            const productId: string = request.params.productId;
            if (!this.validator.isNumberString(userId)) {
                throw new Error('Please enter proper user Id');
            }
            if (!this.validator.isNumberString(productId)) {
                throw new Error('Please enter proper product Id');
            }
            const products: ProductDto[] = await cartDao.getProductDetail(+(userId), parseInt(productId));
            return new GenericResponse<ProductDto[]>().setResponse(products);
        } catch (error) {
            return new GenericResponse<ProductDto[]>().setCode(StatusCode.ERROR).setResponse(error);
        }
    }

    async addItemInCart(req: Request): Promise<GenericResponse<OrderLineDto>> {
        try {

            const orderLineDto: OrderLineDto = <OrderLineDto>req.body;
            orderLineDto.customerId = parseInt(req.params.customerId);
            const products: ProductDto[] = await productDao.getProductById(orderLineDto.productId);
            if (!products.length) {
                return new GenericResponse<OrderLineDto>().setCode(StatusCode.ERROR).setResponse([`Product with product id ${orderLineDto.productId} is not found !`]);
            }
            let cartItems: OrderLineDto[] = await cartDao.getOrderLineByCustomerAndProduct(orderLineDto.customerId, orderLineDto.productId);
            if (cartItems.length) {
                const lineItem: OrderLineDto = await cartDao.updateItemOfCart(cartItems[0].id, orderLineDto);
                return new GenericResponse<OrderLineDto>().setCode(StatusCode.OK).setResponse(lineItem).setMessage("Item is updated in cart");
            }
            const lineItem: OrderLineDto = await cartDao.addItemInCart(orderLineDto);
            return new GenericResponse<OrderLineDto>().setCode(StatusCode.CREATED).setResponse(lineItem).setMessage("Item is added to cart");
        } catch (error) {
            return new GenericResponse<OrderLineDto>().setCode(StatusCode.ERROR).setResponse(error);
        }
    }

    async removeItemFromCart(req: Request): Promise<GenericResponse<string>> {
        try {
            const message: string = await cartDao.removeItemFromCart(+(req.params.cartItemId));
            return new GenericResponse<string>().setCode(StatusCode.NO_CONTENT).setMessage(message);
        } catch (error) {
            return new GenericResponse<string>().setCode(StatusCode.ERROR).setResponse(error);
        }
    }
}
export default new CartService();