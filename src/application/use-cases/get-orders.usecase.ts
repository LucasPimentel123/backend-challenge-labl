import Order from "../../domain/entities/order.entity";
import IOrderRepository from "../../domain/repositories/order.repository.interface";

export default class GetOrdersUseCase {
  constructor(private readonly repository: IOrderRepository) {}

  async execute(params: any): Promise<Order[]> {
    const { startDate, endDate, storeId, orderId, warranty } = params;

    return this.repository.findAll({
      startDate,
      endDate,
      storeId,
      orderId,
      warranty
    });
  }
}