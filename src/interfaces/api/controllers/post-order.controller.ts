import { Request, Response, NextFunction } from 'express';
import PostOrderRequestDto from '../../../application/dto/post-order-request.dto';
import SaveOrdersUseCase from '../../../application/use-cases/save-orders.usecase';
import OrderRepository from '../../../infrastructure/repositories/order.repository';
import ErrorResponse from '../../../shared/exceptions/error-response.exceptions';

export default class PostOrderController {

    constructor(
        private readonly saveOrdersUseCase: SaveOrdersUseCase
    ){
    }

    execute = () => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const orderDto = new PostOrderRequestDto(
                    req.body.orderId,
                    req.body.marketplace,
                    req.body.storeId,
                    req.body.customer,
                    req.body.total,
                    req.body.status,
                    req.body.order_items,
                    req.body.createdAt
                );

                const savedOrder = await this.saveOrdersUseCase.execute(orderDto);

                res.status(201).json({
                    message: 'Order created successfully',
                    orderId: savedOrder.getId()
                });
            } catch (error) {
                if (error instanceof ErrorResponse) {
                    next(error);
                } else {
                    next(new ErrorResponse(500, 'Error creating order', error));
                }
            }
        }
    }
}