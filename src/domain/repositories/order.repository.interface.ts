import Order from "../entities/order.entity";

export default interface IOrderRepository {
    save(order: Order): Promise<boolean>; 
    findAll(filter: { startDate?: string; endDate?: string; storeId?: string; orderId?: string; warranty?: boolean }): Promise<Order[]>;
}