import { IMessage, LoginResponse, StatusMessage } from "../interfaces/interface";
import { Response } from 'express';



export const successResponse = (statusCode: number, data: StatusMessage | LoginResponse | IMessage[], res:Response) => {
    return res.status(statusCode).json(data);
};

export const errorResponse = (statusCode: number, error: StatusMessage, res: Response) => {
    return res.status(statusCode).json(error);
};