import SaveOrdersUseCase from "../../../application/use-cases/save-orders.usecase";
import OrderRepository from "../../../infrastructure/repositories/order.repository";
import PostOrderController from "../controllers/post-order.controller";

export const postOrderModule = (): PostOrderController => {
    const saveOrdersUseCase = new SaveOrdersUseCase(new OrderRepository());
    return new PostOrderController(saveOrdersUseCase);
}