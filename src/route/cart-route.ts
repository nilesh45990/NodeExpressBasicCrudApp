import { Router, Request, Response } from 'express';
import cartService from '../service/cart-service';

class CartRoute {
    router: Router = Router();

    constructor() {
        // get items available in cart by customer id
        this.router.route('/:productId/:userId').get(async (req: Request, res: Response) => {
            res.send(await cartService.getProductDetail(req));
        });
        this.router.route('/:customerId').get(async (req: Request, res: Response) => {
            res.send(await cartService.getOrderLineByCustomer(req));
        }).put(async (req: Request, res: Response) => {
            console.log("add item in cart called ");
            res.send(await cartService.addItemInCart(req));
        });
        this.router.route('/:cartItemId').delete(async (req: Request, res: Response) => {
            console.log("delete cart item called ");
            res.send(await cartService.removeItemFromCart(req));
        });
    }
}
export default new CartRoute().router;