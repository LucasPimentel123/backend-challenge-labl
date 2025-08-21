import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import ProductModel from "./product.model";

@Table({tableName: "Orders_Items", timestamps: false})
export default class OrderItemsModel extends Model {
    @PrimaryKey
    @ForeignKey(() => OrderModel)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    order_id!: string;

    @BelongsTo(() => OrderModel)
    order!: OrderModel;

    @PrimaryKey
    @ForeignKey(() => ProductModel)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    product_id!: string;

    @BelongsTo(() => ProductModel)
    product!: ProductModel

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quantity!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    taxAmount!: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    is_returnable!: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    shippable!: boolean;
     
}