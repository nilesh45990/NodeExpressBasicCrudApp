import { Request } from 'express';
var http = require("request");
import { OrderDto } from '../dto/order-dto';
import orderDao from '../dao/order-dao';
import cartDao from '../dao/cart-dao';
import { GenericResponse, StatusCode } from '../util/generic-response';
import { OrderReportDto } from '../dto/order-report-dto';
import { OrderStatus } from '../util/order-status';
import { Address } from '../dto/address';


class OrderService {

    async getCustomerOrders(request: Request): Promise<GenericResponse<Array<[number, OrderReportDto] | string>>> {
        try {
            const customerId: number = parseInt(request.params.customerId);
            return new GenericResponse<Array<[number, OrderReportDto]>>().setResponse(Array.from(await orderDao.getCustomerOrders(customerId)));
        } catch (error) {
            return new GenericResponse<Array<string>>().setCode(StatusCode.ERROR).setResponse(error);
        }
    }

    async saveOrder(req: Request): Promise<GenericResponse<OrderDto>> {
        try {
            const customerId: number = req.params.customerId;
            let order: OrderDto = new OrderDto();
            order.customerId = customerId;
            order.date = new Date();
            order.status = OrderStatus.ORDER_PLACED;
            const orderDto: OrderDto = await orderDao.saveOrder(order);
            const message: string = await cartDao.updateOrderId(order.id, order.customerId);
            return new GenericResponse<OrderDto>().setMessage(message).setCode(StatusCode.CREATED).setResponse(orderDto);
        } catch (error) {
            return new GenericResponse<OrderDto>().setCode(StatusCode.ERROR).setResponse(error);
        }
    }

    async saveAddress(req: Request): Promise<GenericResponse<string>> {
        try {
            const orderId: number = parseInt(req.params.orderId);
            const orders: OrderDto[] = await orderDao.getOrderById(orderId);
            if (!orders.length) {
                return new GenericResponse<string>().setCode(StatusCode.ERROR).setResponse([`Order with order id ${orderId} is not found !`]);
            }
            let address: Address = <Address>req.body;
            address.orderId = orderId;
            address = await orderDao.saveAddress(address);
            return new GenericResponse<string>().setMessage("Address saved successfully").setCode(StatusCode.CREATED);
        } catch (error) {
            return new GenericResponse<string>().setCode(StatusCode.ERROR).setResponse(error);
        }
    }



}
export default new OrderService();