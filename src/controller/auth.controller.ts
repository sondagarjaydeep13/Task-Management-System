import { Request, Response, NextFunction } from "express";
import { SendJsonResponse, StatusCode } from "../utils/api.response";
import { bcryptPassword, comparePassword, User } from "../model/user.model";
import { generateJwtToken } from "../middleware/auth";

// User sing up

export const UserSignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isUserExist = await User.findOne({ email: req.body.email });
        if (isUserExist) {
            SendJsonResponse(res, StatusCode.ALREADY_EXIST, "User alredy exist with your email");
            return;
        };
        await User.create({ ...req.body, password: await bcryptPassword(req.body.password) });

        SendJsonResponse(res, StatusCode.CREATED, "Signup success");
    } catch (error) {
        SendJsonResponse(res, StatusCode.INTERNAL_SERVER_ERROR, "Internal server error", [], error?.message);
    }
};

// User sign in 

export const UserSignIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isUserExist = await User.findOne({ email: req.body.email });
        if (!isUserExist) {
            SendJsonResponse(res, StatusCode.NOT_FOUND, "Account not found with your email");
            return;
        };

        const isValidePassword = await comparePassword(req.body.password, isUserExist.password);

        if (!isValidePassword) {
            SendJsonResponse(res, StatusCode.BAD_REQUEST, "Pls enter correct password");
            return;
        };

        const getToken = generateJwtToken({ _id: isUserExist._id });

        const userDetails = {
            email: isUserExist.email,
            _id: isUserExist._id,
            token: getToken
        };

        SendJsonResponse(res, StatusCode.OK, "Signin success", userDetails);
    } catch (error) {
        SendJsonResponse(res, StatusCode.INTERNAL_SERVER_ERROR, "Internal server error", [], error?.message);
    }
};