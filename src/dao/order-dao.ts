import { bucket, N1qlQuery } from '../config/connection'
import * as dotenv from 'dotenv';
import { OrderDto } from '../dto/order-dto';
import { OrderReportDto } from '../dto/order-report-dto';
import { OrderLineDto } from '../dto/order-line-dto';
import { Address } from '../dto/address';
dotenv.config();

class OrderDao {

    getOrderById(orderId: number): Promise<OrderDto[]> {
        const sql = N1qlQuery.fromString(` SELECT * FROM demo  where type='order' and id = $1 `);
        return new Promise((resolve, rejects) => {
            bucket.query(sql, [orderId], (error, result) => {
                if (error) rejects(error.message);
                resolve(result.map(result => result));
            });
        });
    }

    getCustomerOrders(customerId: number): Promise<Map<number, OrderReportDto>> {
        const sql = N1qlQuery.fromString(` SELECT o.id orderId, p.name, ol.quantity, (p.price * ol.quantity) total_amount , o.shippingAddress 
                                            FROM demo o 
                                            inner join demo ol on o.id = ol.orderId and ol.type = 'order_line'
                                            INNER JOIN demo p on ol.productId = p.id and p.type = 'product'  
                                            where o.type='order' and o.customerId = $1 `);

        return new Promise((resolve, rejects) => {
            bucket.query(sql, [customerId], (error, result) => {
                if (error) rejects(error.message);
                const response = result.map(result => result);
                let orderMap: Map<number, OrderReportDto> = new Map();
                response.forEach((key, value) => {
                    if (orderMap.get(key.orderId) != null) {
                        let orderDetail: OrderReportDto = orderMap.get(key.orderId);
                        orderDetail.orderId = key.orderId;
                        orderDetail.totalAmount = orderDetail.totalAmount + parseInt(key.total_amount);
                        orderDetail.shippingAddress = key.shippingAddress;
                        let existingLineList: OrderLineDto[] = orderDetail.orderLines;
                        let orderLineDto: OrderLineDto = new OrderLineDto();
                        orderLineDto.productName = key.name;
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
                        orderLineDto.productName = key.name;
                        orderLineDto.quantity = key.quantity;
                        orderLineList.push(orderLineDto);
                        orderDetail.orderLines = orderLineList;
                        orderMap.set(key.orderId, orderDetail);
                    }
                });
                resolve(orderMap);
            });
        });
    }

    saveOrder(orderDto: OrderDto): Promise<OrderDto> {
        var key = "order";
        return new Promise((resolve, rejects) => {
            bucket.counter(key, 1, { initial: 1 }, (err, res) => {
                if (err) throw err;
                const orderId = res.value;
                orderDto.id = orderId;
                bucket.insert(key + "::" + orderId, orderDto, (err, res) => {
                    if (err) rejects(err.message);
                    resolve(orderDto);
                });
            });
        });
    }

    saveAddress(orderId: number, address: Address): Promise<string> {
        const sql = N1qlQuery.fromString(` update demo set shippingAddress = $1 where id = $2  and type='order' `);
        return new Promise((resolve, rejects) => {
            bucket.query(sql, [address, orderId], (err, res) => {
                if (err) rejects(err.message);
                resolve("Address saved successfully!");
            });
        });
    }
}
export default new OrderDao();