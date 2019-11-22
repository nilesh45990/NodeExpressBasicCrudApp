import con from '../config/db-connection';
import * as dotenv from 'dotenv';
import { OrderLineDto } from '../dto/order-line-dto';
import { ProductDto } from '../dto/product-dto';
dotenv.config();

class CartDao {

    getOrderLineByCustomer(customerId: number): Promise<OrderLineDto[]> {
        const sql = `SELECT ol.id,p.id productId,p.name productName,ol.quantity,p.image, (p.price * ol.quantity) totalAmount 
                     FROM order_line ol 
                     INNER JOIN product p on ol.productId = p.id 
                     where ol.orderId IS NULL and ol.customerId=?`;
        return new Promise((resolve, rejects) => {
            con.query(sql, [customerId], (error, result) => {
                if (error) rejects(error.message);
                resolve(result);
            });
        });
    }

    getProductDetail(userId: number, productId: number): Promise<ProductDto[]> {
        const sql = `SELECT p.id, p.name,p.price,p.image,p.description,ol.quantity
                     FROM product p
                     LEFT JOIN order_line ol ON ol.productId = p.id and ol.customerId=? and ol.orderId IS NULL
                     where p.id = ? `;
        return new Promise((resolve, rejects) => {
            con.query(sql, [userId, productId], (error, result) => {
                if (error) rejects(error.message);
                resolve(result);
            });
        });
    }

    getOrderLineByCustomerAndProduct(customerId: number, productId: number): Promise<OrderLineDto[]> {
        const sql = `SELECT p.name productName,ol.quantity orderQuantity , ol.id,ol.customerId 
                    FROM product p  
                    INNER JOIN order_line ol on ol.productId = p.id  
                    where ol.orderId IS NULL and ol.customerId=? and ol.productId=? `;
        return new Promise((resolve, rejects) => {
            con.query(sql, [customerId, productId], (error, result) => {
                if (error) rejects(error.message);
                if (!result.length) {
                    resolve(new Array<OrderLineDto>());
                } else {
                    resolve(result);
                }
            });
        });
    }

    // call when order is placed
    updateOrderId(orderId: number, customerId: number): Promise<string> {
        const sql = `UPDATE order_line SET orderId =?
                    where orderId IS NULL and customerId=? `;
        return new Promise((resolve, rejects) => {
            con.query(sql, [orderId, customerId], (error, result) => {
                if (error) rejects(error.message);
                resolve(`Order placed successfully`);
            });
        });
    }

    // when item is added to cart by add to cart button
    addItemInCart(orderLineDto: OrderLineDto): Promise<OrderLineDto> {
        const sql = `INSERT INTO order_line(productId,quantity,customerId) VALUE(?,?,?) `;
        return new Promise((resolve, rejects) => {
            con.query(sql, [orderLineDto.productId, orderLineDto.quantity, orderLineDto.customerId], (err, res) => {
                if (err) rejects(err.message);
                orderLineDto.id = res.insertId;
                resolve(orderLineDto);
            });
        });
    }

    updateItemOfCart(orderLineId: number, orderLineDto: OrderLineDto): Promise<OrderLineDto> {
        const sql = `UPDATE order_line SET quantity = ? where  id=?`;
        return new Promise((resolve, rejects) => {
            con.query(sql, [orderLineDto.quantity, orderLineId], (err, res) => {
                if (err) rejects(err.message);
                orderLineDto.id = orderLineId;
                resolve(orderLineDto);
            });
        });
    }

    removeItemFromCart(orderLineId: number): Promise<string> {
        const sql = `  DELETE FROM order_line where id=?`;
        return new Promise((resolve, rejects) => {
            con.query(sql, [orderLineId], (err, res) => {
                if (err) rejects(err.message);
                resolve("Item removed from cart successfully !");
            });
        });
    }
}
export default new CartDao();