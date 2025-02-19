import Joi from "joi";

export const UserSignUpJoi = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export const UserSignInJoi = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
