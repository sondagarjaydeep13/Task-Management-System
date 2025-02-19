import { Request, Response, NextFunction } from "express";
import { SendJsonResponse, StatusCode } from "../utils/api.response";
import { Task } from "../model/task.model";
import { CustomRequest } from "../types/core";

// User create new task

export const CreateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Task.create({ ...req.body, userId: (req as CustomRequest).user._id });

        SendJsonResponse(res, StatusCode.CREATED, "Task created successfully");
    } catch (error) {
        SendJsonResponse(res, StatusCode.INTERNAL_SERVER_ERROR, "Internal server error", [], error?.message);
    }
};

// User fetch all task

export const FetchAllTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const size = Number(req.query.size) || 10;
        const skip = (page - 1) * size || 0;

        const matchFilter: Array<any> = [{ userId: (req as CustomRequest).user._id }];
        if (req.query.status) {
            matchFilter.push(
                {
                    $and: [
                        { status: req.query.status }
                    ]
                }
            )
        };

        if (req.query.startDate && req.query.endDate) {
            matchFilter.push(
                {
                    $and: [
                        { dueDate: { $lte: req.query.endDate, $gte: req.query.startDate } }
                    ]
                }
            )
        };

        const allTask = await Task.aggregate([
            {
                $match: {
                    $and: matchFilter
                }
            },
            {
                $sort: {
                    createdAt: -1,
                }
            },
            {
                $facet: {
                    record: [{ $skip: skip }, { $limit: size }],
                    count: [{ $count: "total" }]
                }
            }
        ]);

        const finalResponse = {
            record: allTask[0]?.record ?? [],
            currentPage: page,
            size: size,
            totalRecord: allTask[0]?.count[0]?.total ?? 0
        }

        SendJsonResponse(res, StatusCode.OK, "All task fetch successfully", finalResponse);
    } catch (error) {
        SendJsonResponse(res, StatusCode.INTERNAL_SERVER_ERROR, "Internal server error", [], error?.message);
    }
};


export const FindWithId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = req.params.taskId;
        const fetchTask = await Task.findOne({ _id: taskId });

        if (!fetchTask) {
            SendJsonResponse(res, StatusCode.NOT_FOUND, "Task not found");
            return;
        }

        SendJsonResponse(res, StatusCode.OK, "Task fetch successfully", fetchTask);
    } catch (error) {
        SendJsonResponse(res, StatusCode.INTERNAL_SERVER_ERROR, "Internal server error", [], error?.message);
    }
};

export const UpdateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = req.params.taskId;
        const fetchTask = await Task.findOne({ _id: taskId });
        if (!fetchTask) {
            SendJsonResponse(res, StatusCode.NOT_FOUND, "Task not found");
            return;
        }

        await Task.findOneAndUpdate({ _id: taskId }, { ...req.body });

        SendJsonResponse(res, StatusCode.OK, "Task updated successfully");
    } catch (error) {
        SendJsonResponse(res, StatusCode.INTERNAL_SERVER_ERROR, "Internal server error", [], error?.message);
    }
};


export const DeleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = req.params.taskId;

        const fetchTask = await Task.findOne({ _id: taskId });
        if (!fetchTask) {
            SendJsonResponse(res, StatusCode.NOT_FOUND, "Task not found");
            return;
        }

        await Task.findByIdAndDelete({ _id: taskId });

        SendJsonResponse(res, StatusCode.OK, "Task deleted successfully");
    } catch (error) {
        SendJsonResponse(res, StatusCode.INTERNAL_SERVER_ERROR, "Internal server error", [], error?.message);
    }
};