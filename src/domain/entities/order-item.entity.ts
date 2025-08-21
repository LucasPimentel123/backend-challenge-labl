import Product from './product.entity';

export default class OrderItem {
    constructor(
        private readonly orderId: string,
        private readonly product: Product,
        private readonly quantity: number,
        private readonly taxAmount: number,
        private readonly isReturnable: boolean,
        private readonly shippable: boolean
    ) {}

    getOrderId(): string {
        return this.orderId;
    }

    getProduct(): Product {
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getTaxAmount(): number {
        return this.taxAmount;
    }

    getIsReturnable(): boolean {
        return this.isReturnable;
    }

    getShippable(): boolean {
        return this.shippable;
    }
}
