import { Router, Request, Response } from 'express';
import userService from '../service/user-service';

class UserRoute {
    router: Router = Router();
    constructor() {
        // check user credentials
        this.router.route('/login').post(async (req: Request, res: Response) => {
            res.send(await userService.getUserByUserNamePassword(req));
        });
    }
}
export default new UserRoute().router;