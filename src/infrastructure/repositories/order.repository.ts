import Order from "../../domain/entities/order.entity";
import IOrderRepository from "../../domain/repositories/order.repository.interface";
import OrderModel from "../database/models/order.model";
import CustomerModel from "../database/models/customer.model";
import ProductModel from "../database/models/product.model";
import OrderItemsModel from "../database/models/order-items.model";
import db from "../database/sequelize.config";
import { Op } from "sequelize";
import OrderMapper from "../../application/mapper/order.mapper";

export default class OrderRepository implements IOrderRepository {
    async save(order: Order): Promise<boolean> {
        const transaction = await db.transaction();
        
        try {
            const customerData = {
                name: order.getCustomer().getName(),
                address: order.getCustomer().getAddress(),
                city: order.getCustomer().getCity(),
                country: order.getCustomer().getCountry(),
                postal_code: order.getCustomer().getPostalCode()
            };

            const [customer, customerCreated] = await CustomerModel.findOrCreate({
                where: { name: customerData.name },
                defaults: customerData,
                transaction
            });

            const productPromises = order.getOrderItems().map(async (orderItem) => {
                const product = orderItem.getProduct();
                const productData = {
                    id: product.getId(),
                    warranty: product.getWarranty(),
                    sku: product.getSku(),
                    name: product.getName(),
                    price: product.getPrice(),
                    weight: product.getWeight(),
                    createdAt: product.getCreatedAt(),
                    updatedAt: product.getUpdatedAt(),
                    quantity: product.getQuantity(),
                    image_url: product.getImageUrl(),
                    marketplace_product_id: product.getMarketplaceProductId(),
                    marketplace_parent_product_id: product.getMarketplaceParentProductId()
                };

                const [savedProduct, productCreated] = await ProductModel.findOrCreate({
                    where: { id: product.getId() },
                    defaults: productData,
                    transaction
                });

                return savedProduct;
            });

            await Promise.all(productPromises);

            const orderData = {
                id: order.getId(),
                marketplace: order.getMarketplace(),
                store_id: order.getStoreId(),
                status: order.getStatus(),
                createdAt: order.getCreatedAt(),
                customer_id: customer.id
            };

            const [savedOrder, orderCreated] = await OrderModel.findOrCreate({
                where: { id: order.getId() },
                defaults: orderData,
                transaction
            });

            const orderItemPromises = order.getOrderItems().map(async (orderItem) => {
                const orderItemData = {
                    order_id: order.getId(),
                    product_id: orderItem.getProduct().getId(),
                    quantity: orderItem.getQuantity(),
                    taxAmount: orderItem.getTaxAmount(),
                    is_returnable: orderItem.getIsReturnable(),
                    shippable: orderItem.getShippable()
                };

                await OrderItemsModel.findOrCreate({
                    where: { 
                        order_id: orderItemData.order_id,
                        product_id: orderItemData.product_id
                    },
                    defaults: orderItemData,
                    transaction
                });
            });

            await Promise.all(orderItemPromises);

            await transaction.commit();
            return true;

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async findAll(filter: { startDate?: string; endDate?: string; storeId?: string; orderId?: string; warranty?: boolean }): Promise<Order[]> {
        const { startDate, endDate, storeId, orderId, warranty } = filter;

        const whereConditions: any = {};

        if (startDate && endDate) {
            whereConditions.createdAt = { [Op.between]: [startDate, endDate] };
        }

        if (storeId) {
            whereConditions.store_id = storeId;
        }

        if (orderId) {
            whereConditions.id = orderId;
        }

        const includeOptions: any[] = [
            {
                model: CustomerModel,
                as: 'customer'
            },
            {
                model: OrderItemsModel,
                as: 'ordersItems',
                include: [
                    {
                        model: ProductModel,
                        as: 'product'
                    }
                ]
            }
        ];

        if (warranty !== undefined) {
            includeOptions[1].include[0].where = {
                warranty: warranty
            };
        }

        const orders = await OrderModel.findAll({
            where: whereConditions,
            include: includeOptions
        });

        return orders.map(orderModel => OrderMapper.fromModelToDomain(orderModel));
    }
}