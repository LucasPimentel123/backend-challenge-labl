export default class ErrorResponse {
    status: number;
    message: string;
    error: any;

    public constructor(status: number, message: string, error: any = null){
        this.status = status;
        this.message = message;
        this.error = error;
    }
}