import { Router, Request, Response } from 'express';
import logger from '../config/logger';
import productService from '../service/product-service'

class ProductRoute {

    router: Router = Router();

    constructor() {


        this.router.route('/:productId').get(async (req: Request, res: Response) => {
            logger.info('get product by id called');
            res.send(await productService.getProductById(parseInt(req.params.productId)));
        }).put(async (req: Request, res: Response) => {
            logger.debug('update product called');
            res.send(await productService.updateProduct(req));
        }).delete(async (req: Request, res: Response) => {
            logger.info('delete product called');
            res.send(await productService.deleteProduct(req));
        });
        // get all products
        this.router.route('/').get(async (req: Request, res: Response) => {
            logger.info('get all product called');
            res.send(await productService.getAllProduct());
        }).post(async (req: Request, res: Response) => {
            logger.info('save product called');
            res.send(await productService.saveProduct(req));
        });
    }
}
export default new ProductRoute().router;