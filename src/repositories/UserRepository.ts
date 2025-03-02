import { UserModel, IUser } from '../models/User';

export class UserRepository {
    static async findByEmail(email: string): Promise<IUser | null> {
        return UserModel.findOne({ email });
    }

    static async findById(id: string): Promise<IUser | null> {
        return UserModel.findById(id);
    }

    static async create(userData: Partial<IUser>): Promise<IUser> {
        const user = new UserModel(userData);
        return user.save();
    }

    static async findAll(): Promise<IUser[]> {
        return UserModel.find();
    }

    static async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(id, userData, { new: true });
    }

    static async delete(id: string): Promise<IUser | null> {
        return UserModel.findByIdAndDelete(id);
    }

    static async findByEmailWithPassword(email: string): Promise<IUser | null> {
        return UserModel.findOne({ email }).select('+password');
    }
} 