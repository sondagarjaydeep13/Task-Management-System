import { required } from "joi";
import mongoose, { Document, model, Schema } from "mongoose"

interface ITaskDto extends Document {
    readonly _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    title: string,
    description: string,
    status: string,
    dueDate: string,
};

const TaskSchema: Schema<ITaskDto> = new Schema<ITaskDto>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "in-progress", "completed"],
        default: 'pending'
    },
    dueDate: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
});

export const Task = model<ITaskDto>("Task", TaskSchema);


