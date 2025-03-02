import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
});

export interface IUser extends mongoose.Document {
    username: string;
    email: string;
    password: string;
}

export const UserModel = mongoose.model<IUser>('User', UserSchema); 