import Joi from "joi";

export const UserSignUpJoi = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
});

export const UserSignInJoi = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
});
