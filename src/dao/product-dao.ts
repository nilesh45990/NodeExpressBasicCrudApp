import con from '../config/db-connection';
import * as dotenv from 'dotenv';
import { ProductDto as Product } from '../dto/product-dto';
dotenv.config();

class ProductDao {

    getAllProduct(): Promise<Product[]> {

        const sql = `SELECT id,name,price,image,description FROM product where status=true `;
        return new Promise((resolve, rejects) => {
            con.query(sql, (err, result) => {
                if (err) rejects(err.message);
                resolve(result);
            });
        });
    }

    getProductById(productId: number): Promise<Product[]> {
        const sql = ` SELECT id,name,price,image,description FROM product where status=true and id = ?`;
        return new Promise((resolve, rejects) => {
            con.query(sql, [productId], (err, result) => {
                if (err) rejects(err.message);
                resolve(result);
            });
        });
    }

    saveProduct(product: Product): Promise<Product> {
        const sql = `INSERT INTO product(name,price,image,description,createdBy,createdDate) VALUE(?,?,?,?,?,SYSDATE())`;
        return new Promise((resolve, rejects) => {
            con.query(sql, [product.name, product.price, product.image, product.description, product.createdBy], (err, result) => {
                if (err) rejects(err.message);
                product.id = result.insertId;
                resolve(product);
            });
        });
    }

    updateProduct(productId: number, product: Product): Promise<Product> {
        console.log(product);
        const sql = ` UPDATE product SET name=?, price=?, image=?, description=?,updatedBy=?,updatedDate=SYSDATE() WHERE id=? `;
        return new Promise((resolve, rejects) => {
            con.query(sql, [product.name, product.price, product.image, product.description, product.updatedBy, productId],
                (error, result) => {
                    if (error) rejects(error.message);
                    console.log(result)
                    product.id = productId;
                    resolve(product);
                });
        });
    }

    deleteProduct(productId: number): Promise<string> {
        const sql = ` DELETE FROM product WHERE id=? `;
        return new Promise((resolve, rejects) => {
            con.query(sql, [productId], (error, result) => {
                if (error) rejects(error.message);
                resolve("Product is deleted successfully !");
            });
        });
    }

}
export default new ProductDao();