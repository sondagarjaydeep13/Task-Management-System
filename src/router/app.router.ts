import { Router } from "express";
import AuthRouter from "./auth.router";
import TaskRouter from "./task.router";
import { UserAuth } from "../middleware/auth";

const AppRouter = Router();

// Auth router
AppRouter.use('/auth', AuthRouter);

// Task router

AppRouter.use('/tasks', UserAuth, TaskRouter);

export default AppRouter;