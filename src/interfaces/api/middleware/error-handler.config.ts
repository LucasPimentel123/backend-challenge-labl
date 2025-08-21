import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../../../shared/exceptions/error-response.exceptions";
import { off } from "process";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let status = 500;
    let message = "Internal Server Error";

    if (err instanceof ErrorResponse) {
        status = err.status;
        message = err.message;
    } else if (err instanceof Error) {
        message = err.message;
    }

    if (err.message) {
        console.error(err);
    }

    res.status(status).send({
        message: message,
        status: status
    });
}

export default errorHandler; 