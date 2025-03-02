import mongoose from 'mongoose';
import { TaskService } from '../services/TaskService';
import { TaskStatus } from '../models/Task';
import { UserModel } from '../models/User';
import { MESSAGES } from '../constants/messages';
import { describe, expect, it, beforeEach } from '@jest/globals';

describe('TaskService', () => {
    let userId: string;

    beforeEach(async () => {
        const user = await UserModel.create({
            username: 'usuario22teste',
            email: 'teste22@teste.com',
            password: 'senha123'
        });
        userId = user._id.toString();
    });

    describe('createTask', () => {
        it('deve criar uma tarefa com sucesso', async () => {
            const taskData = {
                title: 'Tarefa de Teste',
                description: 'Descrição de Teste',
                userId
            };

            const task = await TaskService.createTask(taskData);

            expect(task).toBeDefined();
            expect(task.title).toBe(taskData.title);
            expect(task.description).toBe(taskData.description);
            expect(task.status).toBe(TaskStatus.PENDENTE);
            expect(task.userId.toString()).toBe(userId);
        });

        it('deve lançar erro quando o título não for fornecido', async () => {
            const taskData = {
                title: '',
                description: 'Descrição de Teste',
                userId
            };

            await expect(TaskService.createTask(taskData))
                .rejects
                .toThrow(MESSAGES.TASK.TITLE_REQUIRED);
        });

        it('deve lançar erro quando a descrição não for fornecida', async () => {
            const taskData = {
                title: 'Tarefa de Teste',
                description: '',
                userId
            };

            await expect(TaskService.createTask(taskData))
                .rejects
                .toThrow(MESSAGES.TASK.DESCRIPTION_REQUIRED);
        });

        it('deve lançar erro quando o status for inválido', async () => {
            const taskData = {
                title: 'Tarefa de Teste',
                description: 'Descrição de Teste',
                status: 'status_invalido' as TaskStatus,
                userId
            };

            await expect(TaskService.createTask(taskData))
                .rejects
                .toThrow(MESSAGES.TASK.INVALID_STATUS(Object.values(TaskStatus)));
        });
    });

    describe('getAllTasks', () => {
        it('deve retornar array vazio quando não houver tarefas', async () => {
            const tasks = await TaskService.getAllTasks(userId);
            expect(tasks).toEqual([]);
        });

        it('deve retornar todas as tarefas do usuário', async () => {
            await TaskService.createTask({
                title: 'Tarefa 1',
                description: 'Descrição 1',
                userId
            });

            await TaskService.createTask({
                title: 'Tarefa 2',
                description: 'Descrição 2',
                userId
            });

            const tasks = await TaskService.getAllTasks(userId);
            expect(tasks).toHaveLength(2);
            expect(tasks[0].title).toBe('Tarefa 1');
            expect(tasks[1].title).toBe('Tarefa 2');
        });
    });

    describe('updateTaskStatus', () => {
        it('deve atualizar o status da tarefa com sucesso', async () => {
            const task = await TaskService.createTask({
                title: 'Tarefa de Teste',
                description: 'Descrição de Teste',
                userId
            });

            const updatedTask = await TaskService.updateTaskStatus(
                task._id.toString(),
                userId,
                TaskStatus.EM_ANDAMENTO
            );

            expect(updatedTask).toBeDefined();
            expect(updatedTask?.status).toBe(TaskStatus.EM_ANDAMENTO);
        });

        it('deve lançar erro para tarefa inexistente', async () => {
            const nonExistentId = new mongoose.Types.ObjectId().toString();

            await expect(
                TaskService.updateTaskStatus(nonExistentId, userId, TaskStatus.EM_ANDAMENTO)
            ).rejects.toThrow(MESSAGES.TASK.NOT_FOUND);
        });

        it('deve lançar erro para status inválido', async () => {
            const task = await TaskService.createTask({
                title: 'Tarefa de Teste',
                description: 'Descrição de Teste',
                userId
            });

            await expect(
                TaskService.updateTaskStatus(task._id.toString(), userId, 'status_invalido' as TaskStatus)
            ).rejects.toThrow(MESSAGES.TASK.INVALID_STATUS(Object.values(TaskStatus)));
        });
    });

    describe('deleteTask', () => {
        it('deve excluir a tarefa com sucesso', async () => {
            const task = await TaskService.createTask({
                title: 'Tarefa de Teste',
                description: 'Descrição de Teste',
                userId
            });

            const deletedTask = await TaskService.deleteTask(task._id.toString(), userId);
            expect(deletedTask).toBeDefined();

            const tasks = await TaskService.getAllTasks(userId);
            expect(tasks).toHaveLength(0);
        });

        it('deve lançar erro para tarefa inexistente', async () => {
            const nonExistentId = new mongoose.Types.ObjectId().toString();

            await expect(
                TaskService.deleteTask(nonExistentId, userId)
            ).rejects.toThrow(MESSAGES.TASK.NOT_FOUND);
        });
    });
}); 