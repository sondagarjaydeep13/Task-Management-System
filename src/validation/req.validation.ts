
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

import { SendJsonResponse, StatusCode } from "../utils/api.response";

export const ValidateBody = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            SendJsonResponse(res, StatusCode.BAD_REQUEST, "Validation error", [], error?.message);
            return;
        } else {
            next();
        }
    }
};