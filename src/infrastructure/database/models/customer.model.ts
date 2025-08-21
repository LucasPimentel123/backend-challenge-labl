import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({ tableName: 'Customers', timestamps: false })
export default class CustomerModel extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    address?: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    city?: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    country?: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    postal_code?: string

    @HasMany(() => OrderModel)
    orders!: OrderModel[]
}