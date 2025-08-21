import GetOrderController from "../controllers/get-order.controller";
import OrderRepository from "../../../infrastructure/repositories/order.repository";
import GetOrdersUseCase from "../../../application/use-cases/get-orders.usecase";

export const getOrderModule = (): GetOrderController => {
    const orderRepository = new OrderRepository();
    const getOrdersUseCase = new GetOrdersUseCase(orderRepository);

    return new GetOrderController(getOrdersUseCase);
}