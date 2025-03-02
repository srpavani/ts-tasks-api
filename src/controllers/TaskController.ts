import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';
import { TaskStatus } from '../models/Task';
import { IUser } from '../models/User';
import { MESSAGES } from '../constants/messages';

interface AuthRequest extends Request {
    user?: IUser;
}

export class TaskController {
    static async createTask(req: AuthRequest, res: Response) {
        try {
            const { title, description, status } = req.body;
            if (!req.user) {
                return res.status(401).json({ message: MESSAGES.AUTH.NOT_AUTHENTICATED });
            }
            
            const task = await TaskService.createTask({
                title,
                description,
                status,
                userId: req.user._id.toString()
            });
            
            return res.status(201).json({ 
                message: MESSAGES.TASK.CREATED, 
                task 
            });
        } catch (error: any) {
            if (error.message.includes('Status inválido')) {
                return res.status(400).json({ 
                    message: error.message,
                    validStatuses: Object.values(TaskStatus)
                });
            }
            return res.status(400).json({ message: error.message });
        }
    }

    static async getAllTasks(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: MESSAGES.AUTH.NOT_AUTHENTICATED });
            }
            const tasks = await TaskService.getAllTasks(req.user._id.toString());
            
            if (!tasks || tasks.length === 0) {
                return res.status(404).json({ message: MESSAGES.TASK.NO_TASKS });
            }

            return res.status(200).json(tasks);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateTaskStatus(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!req.user) {
                return res.status(401).json({ message: MESSAGES.AUTH.NOT_AUTHENTICATED });
            }

            const task = await TaskService.updateTaskStatus(id, req.user._id.toString(), status);
            if (!task) {
                return res.status(404).json({ message: MESSAGES.TASK.NOT_FOUND });
            }

            return res.status(200).json({ 
                message: MESSAGES.TASK.STATUS_UPDATED, 
                task 
            });
        } catch (error: any) {
            if (error.message.includes('Status inválido')) {
                return res.status(400).json({ 
                    message: error.message,
                    validStatuses: Object.values(TaskStatus)
                });
            }
            return res.status(400).json({ message: error.message });
        }
    }

    static async updateTask(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            if (!req.user) {
                return res.status(401).json({ message: MESSAGES.AUTH.NOT_AUTHENTICATED });
            }
            const taskData = req.body;

            const task = await TaskService.updateTask(id, req.user._id.toString(), taskData);
            if (!task) {
                return res.status(404).json({ message: MESSAGES.TASK.NOT_FOUND });
            }

            return res.status(200).json({ 
                message: MESSAGES.TASK.UPDATED, 
                task 
            });
        } catch (error: any) {
            if (error.message.includes('Status inválido')) {
                return res.status(400).json({ 
                    message: error.message,
                    validStatuses: Object.values(TaskStatus)
                });
            }
            return res.status(400).json({ message: error.message });
        }
    }

    static async deleteTask(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            if (!req.user) {
                return res.status(401).json({ message: MESSAGES.AUTH.NOT_AUTHENTICATED });
            }

            const task = await TaskService.deleteTask(id, req.user._id.toString());
            if (!task) {
                return res.status(404).json({ message: MESSAGES.TASK.NOT_FOUND });
            }

            return res.status(200).json({ message: MESSAGES.TASK.DELETED });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
} 