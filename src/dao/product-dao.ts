import { bucket, N1qlQuery } from '../config/connection'
import uuid from 'uuid';
import * as dotenv from 'dotenv';
import logger from '../config/logger';
import { ProductDto } from '../dto/product-dto';
dotenv.config();

class ProductDao {

    getAllProduct(): Promise<ProductDto[]> {
        const sql = N1qlQuery.fromString(`SELECT e.id, e.name,e.price,e.image,e.description,e.discount[-1] discount FROM demo e where e.type='product' `);
        return new Promise((resolve, rejects) => {
            bucket.query(sql, (error, result) => {
                if (error) rejects(error.message);
                resolve(result.map(result => result));
            });
        });
    }

    getProductById(productId: number): Promise<ProductDto[]> {
        const sql = N1qlQuery.fromString(` SELECT e.id, e.name,e.price,e.image,e.description,e.discount[-1] discount FROM demo e where e.type='product' and e.id = $1 `);
        return new Promise((resolve, rejects) => {
            bucket.query(sql, [productId], (error, result) => {

                if (error) rejects(error.message);
                console.log(result)
                resolve(result.map(result => result));
            });
        });
    }

    saveProduct(productDto: ProductDto): Promise<ProductDto> {
        var key = "product";
        return new Promise((resolve, rejects) => {

            bucket.counter(key, 1, { initial: 1 }, (err, res) => {
                if (err) throw err;
                const productId = res.value;
                productDto.id = productId;
                productDto.type = key;
                bucket.insert(key + "::" + productId, productDto, (err, res) => {
                    if (err) rejects(err.message);
                    resolve(productDto);
                });

            });
        });
    }

    updateProduct(productId: number, product: ProductDto): Promise<ProductDto> {

        const sql = N1qlQuery.fromString(` UPDATE demo SET name=$1, price=$2, image=$3, description=$4 
                                           WHERE type='product' and id=$5 `);
        return new Promise((resolve, rejects) => {
            bucket.query(sql, [product.name, product.price, product.image, product.description, productId], (error, result) => {
                if (error) rejects(error.message);
                product.id = productId;
                resolve(product);
            });
        });
    }

    deleteProduct(productId: number): Promise<string> {
        const sql = N1qlQuery.fromString(` DELETE FROM demo WHERE type='product' and id=$1 `);
        return new Promise((resolve, rejects) => {
            bucket.query(sql, [productId], (error, result) => {
                if (error) rejects(error.message);
                resolve("Product is deleted successfully !");
            });
        });
    }

}
export default new ProductDao();