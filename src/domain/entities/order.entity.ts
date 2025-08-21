import Customer from './customer.entity';
import OrderItem from './order-item.entity';

export default class Order {
    constructor(
        private readonly id: string,
        private readonly marketplace: string,
        private readonly storeId: number,
        private readonly status: string,
        private readonly createdAt: Date,
        private readonly customer: Customer,
        private readonly orderItems: OrderItem[]
    ) {}

    getId(): string {
        return this.id;
    }

    getMarketplace(): string {
        return this.marketplace;
    }

    getStoreId(): number {
        return this.storeId;
    }

    getStatus(): string {
        return this.status;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getCustomer(): Customer {
        return this.customer;
    }

    getOrderItems(): OrderItem[] {
        return this.orderItems;
    }
}
