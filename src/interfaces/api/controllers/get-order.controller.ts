import GetOrdersUseCase from "../../../application/use-cases/get-orders.usecase";
import { Request, Response, NextFunction } from "express";

export default class GetOrderController {
    constructor(
        private readonly getOrdersUseCase: GetOrdersUseCase
    ){}

    execute = () => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const responseBody = await this.getOrdersUseCase.execute(req.query);
            res.status(200).send(responseBody);
        }
    }
}