import { Model, Table } from "sequelize-typescript";

@Table({tableName: 'Orders', timestamps: true})
export class OrderModel extends Model {
    
}