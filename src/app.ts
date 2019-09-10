import express from "express";
import morgan from 'morgan';
import rfs from 'rotating-file-stream';
import * as bodyParser from "body-parser";
import productRoute from './route/product-route';
import cartRoute from './route/cart-route';
import orderRoute from './route/order-route';
import userRoute from './route/user-route';
import loggerRoute from './route/logger-route';
import { Request, Response } from "express-serve-static-core";
class App {
    public app: express.Application = express();
    constructor() {
        var accessLogStream = rfs('access.log', { interval: '1d', path: "log/" });

        this.app.all('*', (req: Request, res: Response, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
            next();
        });
        this.app.use(morgan('common', { stream: accessLogStream }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/v1/products', productRoute);
        this.app.use('/v1/cart', cartRoute);
        this.app.use('/v1/orders', orderRoute);
        this.app.use('/v1/users', userRoute);
        this.app.use('/v1/logs', loggerRoute);


    }
}
export default new App().app;
