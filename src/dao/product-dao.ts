import con from '../config/db-connection';
import { bucket, N1qlQuery } from '../config/connection'
import * as dotenv from 'dotenv';
import { ProductDto } from '../dto/product-dto';
import { Context } from 'mocha';
dotenv.config();

class ProductDao {

    getAllProduct(): Promise<ProductDto[]> {

        const sql = `SELECT id,name,price,image,description FROM product where status=true `;
        return new Promise((resolve, rejects) => {
            con.query(sql, (err, result) => {
                if (err) rejects(err.message);
                resolve(result);
            });
        });
    }

    getProductById(productId: number): Promise<ProductDto[]> {
        const sql = ` SELECT id,name,price,image,description FROM product where status=true and id = ?`;
        return new Promise((resolve, rejects) => {
            con.query(sql, [productId], (err, result) => {
                if (err) rejects(err.message);
                resolve(result);
            });
        });
    }

    saveProduct(productDto: ProductDto): Promise<ProductDto> {
        const sql = `INSERT INTO product(name,price,image,description) VALUE(?,?,?,?)`;
        return new Promise((resolve, rejects) => {
            con.query(sql, [productDto.name, productDto.price, productDto.image, productDto.description], (err, result) => {
                if (err) rejects(err.message);
                productDto.id = result.insertId;
                resolve(productDto);
            });
        });
    }

    updateProduct(productId: number, product: ProductDto): Promise<ProductDto> {

        const sql = ` UPDATE product SET name=?, price=?, image=?, description=? WHERE id=? `;
        return new Promise((resolve, rejects) => {
            con.query(sql, [product.name, product.price, product.image, product.description, productId], (error, result) => {
                if (error) rejects(error.message);
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