import Joi from "joi";

export const CreateTaskJoi = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    status: Joi.string().optional().valid('pending', 'in-progress', 'completed'),
    dueDate: Joi.string()
        .pattern(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/)
        .optional()
});

export const TaskUpdateJoi = Joi.object({
    title: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    status: Joi.string().optional().valid('pending', 'in-progress', 'completed'),
    dueDate: Joi.string()
        .pattern(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/)
        .optional()
});
