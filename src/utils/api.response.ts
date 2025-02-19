import { Response } from "express";

export const SendJsonResponse = (res: Response, status: number, message: string, data?: any, error?: any) => {
    return res.status(status).json({
        status: status,
        message: message,
        data: data,
        error: error,
    })
};

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500,
    NOT_FOUND = 404,
    ALREADY_EXIST = 409,
    UNAUTHORIZED = 401,
}