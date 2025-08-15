import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../../shared/exceptions/error-response.exceptions";
import { logger } from "./logger.config";

const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Erro Interno."
    if (err.message) {
      logger.error(err)
    }
    res.status(status).send({
      message: message
    });
  
  }
  
  export default errorHandler; 