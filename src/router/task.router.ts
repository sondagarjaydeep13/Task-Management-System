import { Router } from "express";
import { CreateTask, DeleteTask, FetchAllTask, FindWithId, UpdateTask } from "../controller/task.controller";
import { ValidateBody } from "../validation/req.validation";
import { CreateTaskJoi, TaskUpdateJoi } from "../validation/task.joi";


const TaskRouter = Router();

// Create task router
TaskRouter.post('/create', ValidateBody(CreateTaskJoi), CreateTask);

// Fetch task router
TaskRouter.get('/fetch', FetchAllTask);

// Fetch task with id
TaskRouter.get('/fetch/:taskId', FindWithId);

// update task router
TaskRouter.put('/update/:taskId', ValidateBody(TaskUpdateJoi), UpdateTask);

// delete task router
TaskRouter.delete('/delete/:taskId', DeleteTask);



export default TaskRouter;