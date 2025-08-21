import { Router } from "express";
import { Request, Response, NextFunction } from 'express';
import { postOrderModule } from "./modules/post-order.module";
import { getOrderModule } from "./modules/get-order.module";

const routes = Router()

routes.get('/orders', getOrderModule().execute());

routes.post('/orders', postOrderModule().execute())

routes.get('/health', (req, res) => {
    res.status(200).send('OK');
});

export {
    routes
}