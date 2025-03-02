import { TaskModel, ITask, TaskStatus } from '../models/Task';
import mongoose from 'mongoose';

export class TaskRepository {
    static async create(taskData: Partial<ITask>): Promise<ITask> {
        const task = new TaskModel(taskData);
        return task.save();
    }

    static async findAll(userId: string): Promise<ITask[]> {
        return TaskModel.find({ userId: new mongoose.Types.ObjectId(userId) });
    }

    static async findById(id: string, userId: string): Promise<ITask | null> {
        return TaskModel.findOne({ 
            _id: new mongoose.Types.ObjectId(id), 
            userId: new mongoose.Types.ObjectId(userId) 
        });
    }

    static async update(id: string, userId: string, taskData: Partial<ITask>): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate(
            { 
                _id: new mongoose.Types.ObjectId(id), 
                userId: new mongoose.Types.ObjectId(userId) 
            },
            taskData,
            { new: true }
        );
    }

    static async updateStatus(id: string, userId: string, status: TaskStatus): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate(
            { 
                _id: new mongoose.Types.ObjectId(id), 
                userId: new mongoose.Types.ObjectId(userId) 
            },
            { status },
            { new: true }
        );
    }

    static async delete(id: string, userId: string): Promise<ITask | null> {
        return TaskModel.findOneAndDelete({ 
            _id: new mongoose.Types.ObjectId(id), 
            userId: new mongoose.Types.ObjectId(userId) 
        });
    }
} 