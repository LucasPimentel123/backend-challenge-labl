import express from 'express';
import errorHandler from './infrastructure/config/error-handler.config';
import db from './infrastructure/database/sequelize.config';

class App {
  public server: express.Application;
  

  constructor(){
    this.server = express();

    this.init();
  }

  async init(){
    this.middlewares();
    await this.database();
  }

  middlewares(){
    this.server.use(express.json());
    this.server.use(errorHandler);
  }

  async database(){
    await db.sync({ alter: false });
  }
}

export default new App().server;