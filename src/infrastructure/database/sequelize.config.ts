import { Sequelize } from "sequelize-typescript";

let db: Sequelize;

db = new Sequelize(process.env.DATABASE_URL as string, {
    logging: false
});

db.addModels([
    __dirname + '/models',
]);

export default db;