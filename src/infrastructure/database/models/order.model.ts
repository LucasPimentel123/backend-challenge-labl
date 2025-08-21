import { Model, Table, Column, PrimaryKey, ForeignKey, DataType, HasMany, CreatedAt, UpdatedAt, BelongsTo, Index } from 'sequelize-typescript';
import CustomerModel from './customer.model';
import OrderItemsModel from './order-items.model';

@Table(
    { 
        tableName: 'Orders', 
        timestamps: false, 
        indexes: [
            {
                name: 'idx_orders_created_at',
                fields: ['createdAt']
            },
            {
                name: 'idx_orders_customer_id',
                fields: ['customer_id']
            },
            {
                name: 'idx_orders_store_id',
                fields: ['store_id']
            },
        ]
    }
)
export default class OrderModel extends Model {
    @PrimaryKey
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    marketplace!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    store_id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    status!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    createdAt!: Date;

    @ForeignKey(() => CustomerModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    customer_id!: number

    @BelongsTo(() => CustomerModel)
    customer!: CustomerModel

    @HasMany(() => OrderItemsModel)
    ordersItems!: OrderItemsModel[]
}