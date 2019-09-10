import { bucket, N1qlQuery } from '../config/connection'
import * as dotenv from 'dotenv';
import { OrderLineDto } from '../dto/order-line-dto';
import { StatusCode } from '../util/generic-response';
import { ProductDto } from '../dto/product-dto';
dotenv.config();

class CartDao {

    getOrderLineByCustomer(customerId: number): Promise<OrderLineDto[]> {
        const sql = N1qlQuery.fromString(`SELECT ol.id,p.id productId,p.name productName,ol.quantity,p.image, (p.price * ol.quantity) totalAmount 
                                          FROM demo ol 
                                          INNER JOIN demo p on ol.productId = p.id and p.type = 'product'  
                                          where ol.type='order_line' and ol.orderId IS MISSING and ol.customerId=$1`);
        return new Promise((resolve, rejects) => {
            bucket.query(sql, [customerId], (error, result) => {
                if (error) rejects(error.message);
                resolve(result.map(result => result));
            });
        });
    }

    getProductDetail(userId: number, productId: number): Promise<ProductDto[]> {
        const sql = N1qlQuery.fromString(` SELECT p.id, p.name,p.price,p.image,p.description,p.discount[-1] discount,ol.quantity
        FROM demo p
        LEFT JOIN demo ol ON ol.productId = p.id and ol.type='order_line' and ol.customerId=$2 and ol.orderId is missing
        where p.type='product' and p.id = $1 `);
        return new Promise((resolve, rejects) => {
            bucket.query(sql, [productId, userId], (error, result) => {

                if (error) rejects(error.message);
                console.log(result)
                resolve(result.map(result => result));
            });
        });
    }

    getOrderLineByCustomerAndProduct(customerId: number, productId: number): Promise<OrderLineDto[]> {
        const sql = N1qlQuery.fromString(`SELECT p.name productName,ol.quantity orderQuantity , ol.id,ol.customerId 
                                          FROM demo p  
                                          INNER JOIN demo ol on ol.productId = p.id and p.type = 'product'  
                                          where ol.type='order_line' and ol.orderId IS MISSING and ol.customerId=$1 and ol.productId=$2 `);
        return new Promise((resolve, rejects) => {
            bucket.query(sql, [customerId, productId], (error, result) => {
                console.log(error);
                if (error) rejects(error.message);
                if (!result.length) {
                    resolve(new Array<OrderLineDto>());
                } else {
                    resolve(result.map(result => result));
                }
            });
        });
    }

    updateOrderId(orderId: number, customerId: number): Promise<string> {
        const sql = N1qlQuery.fromString(` UPDATE demo ol 
                                            SET orderId = $1
                                            where ol.type='order_line' and ol.orderId IS MISSING and ol.customerId=$2 `);
        return new Promise((resolve, rejects) => {
            bucket.query(sql, [orderId, customerId], (error, result) => {
                if (error) rejects(error.message);
                resolve(`Order placed successfully`);
            });
        });
    }

    addItemInCart(orderLineDto: OrderLineDto): Promise<OrderLineDto> {
        const key = "order_line";
        return new Promise((resolve, rejects) => {
            bucket.counter(key, 1, { initial: 1 }, (err, res) => {
                if (err) throw err;
                const id = res.value;
                orderLineDto.id = id;
                orderLineDto.type = key;
                bucket.insert(key + "::" + id, orderLineDto, (err, res) => {
                    if (err) rejects(err.message);
                    resolve(orderLineDto);
                });
            });
        });
    }

    updateItemOfCart(orderLineId: number, orderLineDto: OrderLineDto): Promise<OrderLineDto> {
        const sql = N1qlQuery.fromString(`  UPDATE demo ol 
                                            SET quantity = $1
                                            where ol.type='order_line' and ol.orderId IS MISSING and ol.id=$2`);
        return new Promise((resolve, rejects) => {
            bucket.query(sql, [orderLineDto.quantity, orderLineId], (err, res) => {
                if (err) rejects(err.message);
                resolve(orderLineDto);
            });
        });
    }

    removeItemFromCart(orderLineId: number): Promise<string> {
        const sql = N1qlQuery.fromString(`  DELETE FROM demo 
                                            where type='order_line' and orderId IS MISSING and id=$1`);
        return new Promise((resolve, rejects) => {
            bucket.query(sql, [orderLineId], (err, res) => {
                if (err) rejects(err.message);
                resolve("Item removed from cart successfully !");
            });
        });
    }
}
export default new CartDao();