import { TaskRepository } from '../repositories/TaskRepository';
import { ITask, TaskStatus } from '../models/Task';
import mongoose from 'mongoose';
import { MESSAGES } from '../constants/messages';

export class TaskService {
    static async createTask(taskData: { 
        title: string; 
        description: string; 
        userId: string;
        status?: TaskStatus;
    }): Promise<ITask> {
        if (!taskData.title) {
            throw new Error(MESSAGES.TASK.TITLE_REQUIRED);
        }
        if (!taskData.description) {
            throw new Error(MESSAGES.TASK.DESCRIPTION_REQUIRED);
        }

        // Validar status se fornecido
        if (taskData.status && !Object.values(TaskStatus).includes(taskData.status)) {
            throw new Error(MESSAGES.TASK.INVALID_STATUS(Object.values(TaskStatus)));
        }

        return TaskRepository.create({
            ...taskData,
            userId: new mongoose.Types.ObjectId(taskData.userId),
            status: taskData.status || TaskStatus.PENDENTE
        });
    }

    static async getAllTasks(userId: string): Promise<ITask[]> {
        return TaskRepository.findAll(userId);
    }

    static async updateTaskStatus(
        taskId: string, 
        userId: string, 
        status: TaskStatus
    ): Promise<ITask | null> {
        if (!Object.values(TaskStatus).includes(status)) {
            throw new Error(MESSAGES.TASK.INVALID_STATUS(Object.values(TaskStatus)));
        }

        const task = await TaskRepository.findById(taskId, userId);
        if (!task) {
            throw new Error(MESSAGES.TASK.NOT_FOUND);
        }
        return TaskRepository.updateStatus(taskId, userId, status);
    }

    static async updateTask(
        taskId: string,
        userId: string,
        taskData: Partial<ITask>
    ): Promise<ITask | null> {
        const task = await TaskRepository.findById(taskId, userId);
        if (!task) {
            throw new Error(MESSAGES.TASK.NOT_FOUND);
        }

        // Validar status se estiver sendo atualizado
        if (taskData.status && !Object.values(TaskStatus).includes(taskData.status)) {
            throw new Error(MESSAGES.TASK.INVALID_STATUS(Object.values(TaskStatus)));
        }

        return TaskRepository.update(taskId, userId, taskData);
    }

    static async deleteTask(taskId: string, userId: string): Promise<ITask | null> {
        const task = await TaskRepository.findById(taskId, userId);
        if (!task) {
            throw new Error(MESSAGES.TASK.NOT_FOUND);
        }
        return TaskRepository.delete(taskId, userId);
    }
} 