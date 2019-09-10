import { Router, Request, Response } from 'express';
import logger from '../config/logger';
import orderService from '../service/order-service';
import { OrderLineDto } from '../dto/order-line-dto';
class OrderRoute {
    router: Router = Router();

    constructor() {
        // get orders of customer by customer id 
        this.router.route('/:customerId').get(async (req: Request, res: Response) => {
            logger.info('get orders of customer by customer id ');
            res.send(await orderService.getCustomerOrders(req));
        });
        // place order of customer
        this.router.route('/').post(async (req: Request, res: Response) => {
            logger.info('create order called');
            res.send(await orderService.saveOrder(req));
        });
        // update address for order
        this.router.route('/address/:orderId').put(async (req: Request, res: Response) => {
            logger.info(' update shipping addredd for order');
            res.send(await orderService.saveAddress(req));
        });
    }
}
export default new OrderRoute().router;