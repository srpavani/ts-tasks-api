import { z } from 'zod';
import { ValidationConfig as config } from '../config/validation.config';

export const TaskStatus = {
    PENDING: 'pendente',
    IN_PROGRESS: 'em_andamento',
    COMPLETED: 'concluida',
} as const;

export const taskBaseSchema = z.object({
    title: z.string()
        .min(config.TASK.TITLE.MIN, config.ERROR_MESSAGES.VALIDATION.TASK.TITLE.MIN)
        .max(config.TASK.TITLE.MAX, config.ERROR_MESSAGES.VALIDATION.TASK.TITLE.MAX),
    description: z.string()
        .min(config.TASK.DESCRIPTION.MIN, config.ERROR_MESSAGES.VALIDATION.TASK.DESCRIPTION.MIN)
        .max(config.TASK.DESCRIPTION.MAX, config.ERROR_MESSAGES.VALIDATION.TASK.DESCRIPTION.MAX),
    status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED], {
        errorMap: () => ({ message: config.ERROR_MESSAGES.VALIDATION.TASK.STATUS })
    }).default(TaskStatus.PENDING),
});

export const taskCreateSchema = taskBaseSchema.omit({
    status: true
}).extend({
    status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED], {
        errorMap: () => ({ message: config.ERROR_MESSAGES.VALIDATION.TASK.STATUS })
    }).optional().default(TaskStatus.PENDING),
});

export const taskUpdateSchema = taskBaseSchema.partial();

export const taskStatusUpdateSchema = z.object({
    status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED], {
        errorMap: () => ({ message: config.ERROR_MESSAGES.VALIDATION.TASK.STATUS })
    }),
});

export type TaskCreate = z.infer<typeof taskCreateSchema>;
export type TaskUpdate = z.infer<typeof taskUpdateSchema>;
export type TaskStatusUpdate = z.infer<typeof taskStatusUpdateSchema>; 