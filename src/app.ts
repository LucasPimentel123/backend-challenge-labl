import express from 'express';
import db from './infrastructure/database/sequelize.config';
import { routes } from './interfaces/api/routes';
import errorHandler from './interfaces/api/middleware/error-handler.config';

class App {
  public server: express.Application;
  

  constructor(){
    this.server = express();

    this.init();
  }

  async init(){
    this.middlewares();
    this.routes();
    await this.database();
  }

  middlewares(){
    this.server.use(express.json());
    this.server.use(errorHandler);
  }

  routes(){
    this.server.use(routes);
  }

  async database(){
    await db.sync({ alter: false });
  }
}

export default new App().server;