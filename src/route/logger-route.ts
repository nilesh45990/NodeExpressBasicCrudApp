import { Router, Request, Response } from "express";
import logger from '../config/logger';
class LoggerRoute {
    router: Router = Router();
    constructor() {
        // console.log(logger.levels)
        this.router.route('/').post((request: Request, response: Response) => {
            // console.log('this is ip address : ');
            if (request.body.level == '1') {
                logger.debug(request.body.message);
            } else if (request.body.level == '2') {
                logger.info(request.body.message);
            } else if (request.body.level == '4') {
                logger.warn(request.body.message);
            } else if (request.body.level == '5' || request.body.level == '6') {
                logger.error(request.body.message);
            }
        });
    }
}
export default new LoggerRoute().router;