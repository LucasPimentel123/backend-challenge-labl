import PostOrderRequestDto, { CustomerDto, ProductDto, OrderItemDto } from '../dto/post-order-request.dto';
import Order from '../../domain/entities/order.entity';
import Customer from '../../domain/entities/customer.entity';
import Product from '../../domain/entities/product.entity';
import OrderItem from '../../domain/entities/order-item.entity';
import OrderModel from '../../infrastructure/database/models/order.model';
import CustomerModel from '../../infrastructure/database/models/customer.model';
import ProductModel from '../../infrastructure/database/models/product.model';
import OrderItemsModel from '../../infrastructure/database/models/order-items.model';

export default class OrderMapper {
    static toDomain(dto: PostOrderRequestDto): Order {
        const customer = this.mapCustomer(dto.getCustomer());
        const orderItems = dto.getOrderItems().map(item => this.mapOrderItem(item, dto.getOrderId()));
        
        return new Order(
            dto.getOrderId(),
            dto.getMarketplace(),
            dto.getStoreId(),
            dto.getStatus(),
            new Date(dto.getCreatedAt()),
            customer,
            orderItems
        );
    }

    private static mapCustomer(customerDto: CustomerDto): Customer {
        return new Customer(
            customerDto.name,
            customerDto.address || undefined,
            customerDto.city || undefined,
            customerDto.country || undefined,
            customerDto.postal_code || undefined
        );
    }

    private static mapProduct(productDto: ProductDto): Product {
        return new Product(
            productDto.product_id,
            productDto.warranty,
            productDto.sku,
            productDto.name,
            parseFloat(productDto.price),
            parseFloat(productDto.weight),
            new Date(productDto.created),
            new Date(productDto.updated),
            productDto.quantity,
            productDto.image_url,
            productDto.marketplace_product_id,
            productDto.marketplace_parent_product_id
        );
    }

    private static mapOrderItem(orderItemDto: OrderItemDto, orderId: string): OrderItem {
        const product = this.mapProduct(orderItemDto.product);
        
        return new OrderItem(
            orderId,
            product,
            orderItemDto.quantity,
            orderItemDto.data.tax_amount,
            orderItemDto.is_returnable,
            orderItemDto.data.shippable
        );
    }

    static fromModelToDomain(orderModel: OrderModel): Order {
        const customer = this.mapCustomerFromModel(orderModel.customer);
        const orderItems = orderModel.ordersItems.map(item => this.mapOrderItemFromModel(item));
        
        return new Order(
            orderModel.id,
            orderModel.marketplace,
            orderModel.store_id,
            orderModel.status,
            orderModel.createdAt,
            customer,
            orderItems
        );
    }

    private static mapCustomerFromModel(customerModel: CustomerModel): Customer {
        return new Customer(
            customerModel.name,
            customerModel.address || undefined,
            customerModel.city || undefined,
            customerModel.country || undefined,
            customerModel.postal_code || undefined
        );
    }

    private static mapProductFromModel(productModel: ProductModel): Product {
        return new Product(
            productModel.id,
            productModel.warranty,
            productModel.sku,
            productModel.name,
            productModel.price,
            productModel.weight,
            productModel.createdAt,
            productModel.updatedAt,
            productModel.quantity,
            productModel.image_url,
            productModel.marketplace_product_id,
            productModel.marketplace_parent_product_id
        );
    }

    private static mapOrderItemFromModel(orderItemModel: OrderItemsModel): OrderItem {
        const product = this.mapProductFromModel(orderItemModel.product);
        
        return new OrderItem(
            orderItemModel.order_id,
            product,
            orderItemModel.quantity,
            orderItemModel.taxAmount,
            orderItemModel.is_returnable,
            orderItemModel.shippable
        );
    }
}
