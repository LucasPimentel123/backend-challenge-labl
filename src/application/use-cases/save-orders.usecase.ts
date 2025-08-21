import PostOrderRequestDto from '../dto/post-order-request.dto';
import OrderMapper from '../mapper/order.mapper';
import Order from '../../domain/entities/order.entity';
import IOrderRepository from '../../domain/repositories/order.repository.interface';
import ErrorResponse from '../../shared/exceptions/error-response.exceptions';

export default class SaveOrdersUseCase {
    constructor(
        private readonly repository: IOrderRepository
    ){}

    async execute(orderDto: PostOrderRequestDto): Promise<Order> {
        const order = OrderMapper.toDomain(orderDto);
        const savedOrder = await this.repository.save(order);
        
        if(!savedOrder){
            throw new ErrorResponse(500, "Error saving order");
        }
        
        return order;
    }
}