import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderItemsModel from "./order-items.model";

@Table({tableName: "Products", timestamps: false, indexes: [
    {
        name: 'idx_products_warranty',
        fields: ['warranty']
    },
]})
export default class ProductModel extends Model {
    @PrimaryKey
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    id!: string

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    warranty!: boolean

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    sku!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string

    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    price!: number

    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    weight!: number

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    createdAt!: Date

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    updatedAt!: Date

    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    quantity!: number
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    image_url!: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    marketplace_product_id!: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    marketplace_parent_product_id!: number

    @HasMany(() => OrderItemsModel)
    ordersItems!: OrderItemsModel[]
}