export default class Product {
    constructor(
        private readonly id: string,
        private readonly warranty: boolean,
        private readonly sku: string,
        private readonly name: string,
        private readonly price: number,
        private readonly weight: number,
        private readonly createdAt: Date,
        private readonly updatedAt: Date,
        private readonly quantity: number,
        private readonly imageUrl: string,
        private readonly marketplaceProductId: number,
        private readonly marketplaceParentProductId: number
    ) {}

    getId(): string {
        return this.id;
    }

    getWarranty(): boolean {
        return this.warranty;
    }

    getSku(): string {
        return this.sku;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getWeight(): number {
        return this.weight;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getImageUrl(): string {
        return this.imageUrl;
    }

    getMarketplaceProductId(): number {
        return this.marketplaceProductId;
    }

    getMarketplaceParentProductId(): number {
        return this.marketplaceParentProductId;
    }
}
