import con from '../config/db-connection';
import * as dotenv from 'dotenv';
import { OrderDto } from '../dto/order-dto';
import { OrderReportDto } from '../dto/order-report-dto';
import { OrderLineDto } from '../dto/order-line-dto';
import { Address } from '../dto/address';

dotenv.config();

class OrderDao {

    getOrderById(orderId: number): Promise<OrderDto[]> {
        const sql = ` SELECT * FROM order where id = ? `;
        return new Promise((resolve, rejects) => {
            con.query(sql, [orderId], (err, result) => {
                if (err) rejects(err.message);
                resolve(result);
            });
        });
    }

    getCustomerOrders(customerId: number): Promise<Map<number, OrderReportDto>> {
        const sql = ` SELECT o.id orderId, p.name, ol.quantity, (p.price * ol.quantity) total_amount , o.shippingAddress 
                                            FROM order o 
                                            inner join order_line ol on o.id = ol.orderId 
                                            INNER JOIN product p on ol.productId = p.id 
                                            where o.customerId = ? `;

        return new Promise((resolve, rejects) => {
            con.query(sql, [customerId], (error, result: any) => {
                if (error) rejects(error.message);
                const response = result.map((result: any) => result);
                let orderMap: Map<number, OrderReportDto> = new Map();
                response.forEach((key: any, value: string) => {
                    if (orderMap.get(key.orderId) != null) {
                        let orderDetail: OrderReportDto = orderMap.get(key.orderId);
                        orderDetail.orderId = key.orderId;
                        orderDetail.totalAmount = orderDetail.totalAmount + parseInt(key.total_amount);
                        orderDetail.shippingAddress = key.shippingAddress;
                        let existingLineList: OrderLineDto[] = orderDetail.items;
                        let orderLineDto: OrderLineDto = new OrderLineDto();
                        // orderLineDto.productName = key.name;
                        orderLineDto.quantity = key.quantity;
                        existingLineList.push(orderLineDto);
                        orderMap.set(key.orderId, orderDetail);
                    } else {
                        let orderDetail: OrderReportDto = new OrderReportDto();
                        orderDetail.orderId = key.orderId;
                        orderDetail.totalAmount = orderDetail.totalAmount + parseInt(key.total_amount);
                        orderDetail.shippingAddress = key.shippingAddress;
                        let orderLineList: OrderLineDto[] = new Array<OrderLineDto>();
                        let orderLineDto: OrderLineDto = new OrderLineDto();
                        // orderLineDto.productName = key.name;
                        orderLineDto.quantity = key.quantity;
                        orderLineList.push(orderLineDto);
                        orderDetail.items = orderLineList;
                        orderMap.set(key.orderId, orderDetail);
                    }
                });
                resolve(orderMap);
            });
        });
    }

    saveOrder(orderDto: OrderDto): Promise<OrderDto> {
        const sql = `INSERT INTO order(customerId,status) VALUE(?,?)`
        return new Promise((resolve, rejects) => {
            con.query(sql, [orderDto.customerId, orderDto.status], (err, result) => {
                if (err) rejects(err.message);
                orderDto.id = result.insertId;
                resolve(orderDto);
            });
        });
    }

    saveAddress(address: Address): Promise<Address> {
        const sql = ` INSERT INTO address(customerId,type,line1,line2,city,state,country,orderId) VALUE(?,?,?,?,?,?,?,?) `;
        return new Promise((resolve, rejects) => {
            con.query(sql, [address.customerId, address.type, address.line1, address.line2, address.city, address.state,
            address.country, address.orderId], (err, res) => {
                if (err) rejects(err.message);
                address.id = res.insertId;
                resolve(address);
            });
        });
    }
}
export default new OrderDao();