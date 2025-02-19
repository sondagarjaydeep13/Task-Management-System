import mongoose, { Document, model, Schema } from "mongoose"
import bcrypt from 'bcrypt';

interface IUserDto extends Document {
    readonly _id: mongoose.Schema.Types.ObjectId,
    name: string,
    email: string,
    password: string,
};

const UserSchema: Schema<IUserDto> = new Schema<IUserDto>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

export const User = model<IUserDto>("User", UserSchema);


export const bcryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
};