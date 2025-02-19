import Joi from "joi";

export const CreateTaskJoi = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().optional().valid('pending', 'in-progress', 'completed'),
    dueDate: Joi.date().optional(),
});

export const TaskUpdateJoi = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().optional().valid('pending', 'in-progress', 'completed'),
});
