import { IsString, IsNumber, IsBoolean, IsArray, IsOptional, ValidateNested, IsNotEmpty, IsDateString, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    state?: string;

    @IsString()
    @IsOptional()
    country?: string;

    @IsString()
    @IsOptional()
    postal_code?: string;
}

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    sku!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsArray()
    @IsString({ each: true })
    tags!: string[];

    @IsString()
    @IsNotEmpty()
    price!: string;

    @IsString()
    @IsNotEmpty()
    weight!: string;

    @IsDateString()
    created!: string;

    @IsDateString()
    updated!: string;

    @IsNumber()
    quantity!: number;

    @IsString()
    @IsNotEmpty()
    image_url!: string;

    @IsString()
    @IsNotEmpty()
    product_id!: string;

    @IsArray()
    @IsString({ each: true })
    original_tags!: string[];

    @IsString()
    @IsNotEmpty()
    warehouse_location!: string;

    @IsNumber()
    marketplace_product_id!: number;

    @IsBoolean()
    warranty!: boolean;

    @IsNumber()
    marketplace_parent_product_id!: number;
}

export class OrderItemDataDto {
    @IsBoolean()
    shippable!: boolean;

    @IsArray()
    properties!: any[];

    @IsNumber()
    tax_amount!: number;

    @IsOptional()
    @IsNumber()
    location_id?: number | null;

    @IsNumber()
    line_item_id!: number;
}

export class OrderItemDto {
    @IsString()
    @IsNotEmpty()
    sku!: string;

    @ValidateNested()
    @Type(() => OrderItemDataDto)
    data!: OrderItemDataDto;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @ValidateNested()
    @Type(() => ProductDto)
    product!: ProductDto;

    @IsNumber()
    quantity!: number;

    @IsString()
    @IsNotEmpty()
    unit_price!: string;

    @IsBoolean()
    is_returnable!: boolean;

    @IsString()
    @IsNotEmpty()
    order_item_id!: string;

    @IsBoolean()
    get_external_product!: boolean;
}

export default class PostOrderRequestDto {
    @IsString()
    @IsNotEmpty()
    orderId!: string;

    @IsString()
    @IsNotEmpty()
    marketplace!: string;

    @IsNumber()
    storeId!: number;

    @ValidateNested()
    @Type(() => CustomerDto)
    customer!: CustomerDto;

    @IsNumber()
    total!: number;

    @IsString()
    @IsNotEmpty()
    status!: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    order_items!: OrderItemDto[];

    @IsDateString()
    createdAt!: string;

    constructor(
        orderId: string,
        marketplace: string,
        storeId: number,
        customer: CustomerDto,
        total: number,
        status: string,
        order_items: OrderItemDto[],
        createdAt: string
    ) {
        this.orderId = orderId;
        this.marketplace = marketplace;
        this.storeId = storeId;
        this.customer = customer;
        this.total = total;
        this.status = status;
        this.order_items = order_items;
        this.createdAt = createdAt;
    }

    getOrderId(): string {
        return this.orderId;
    }

    getMarketplace(): string {
        return this.marketplace;
    }

    getStoreId(): number {
        return this.storeId;
    }

    getCustomer(): CustomerDto {
        return this.customer;
    }

    getTotal(): number {
        return this.total;
    }

    getStatus(): string {
        return this.status;
    }

    getOrderItems(): OrderItemDto[] {
        return this.order_items;
    }

    getCreatedAt(): string {
        return this.createdAt;
    }
}