import jwt from 'jsonwebtoken';
import { AppConfig } from '../config/app.config';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { SendJsonResponse, StatusCode } from '../utils/api.response';
import { User } from '../model/user.model';
import { CustomRequest } from '../types/core';

export interface jwtPayload {
    _id: mongoose.Schema.Types.ObjectId,
}

const jwtKey = AppConfig.JWT_KEY;

export const generateJwtToken = (payload: jwtPayload) => {
    const token = jwt.sign(payload, jwtKey);
    return token;
};

export const verifyJwtToken = (token: string) => {
    const decode = jwt.verify(token, jwtKey) as { _id: mongoose.Types.ObjectId };
    return decode;
};



export const UserAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            SendJsonResponse(res, StatusCode.BAD_REQUEST, "Token not found");
            return
        };

        const token = req.headers.authorization.split('Bearer')[1].trim();

        const decode = verifyJwtToken(token);

        const isUserExist = await User.findById({ _id: decode._id });

        if (!isUserExist) {
            SendJsonResponse(res, StatusCode.NOT_FOUND, "User not found");
            return
        } else {
            (req as CustomRequest).user = {
                _id: isUserExist._id
            };
            next();
        }
    } catch (error) {
        SendJsonResponse(res, StatusCode.BAD_REQUEST, "Invalid token", [], error?.message);
    }
}