import { Router } from "express";
import { ValidateBody } from "../validation/req.validation";
import { UserSignInJoi, UserSignUpJoi } from "../validation/auth.joi";
import { UserSignIn, UserSignUp } from "../controller/auth.controller";

const AuthRouter = Router();

// User sign up

AuthRouter.post('/signup', ValidateBody(UserSignUpJoi), UserSignUp);

// User sign in

AuthRouter.post('/signin', ValidateBody(UserSignInJoi), UserSignIn);

export default AuthRouter;