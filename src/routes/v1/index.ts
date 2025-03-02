import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import taskRoutes from './task.routes';

const router = Router();

// rotas de auth
router.use('/auth', authRoutes);

// rotas de usuarios
router.use('/users', userRoutes);

// rotas de tarefas
router.use('/tasks', taskRoutes);

export default router; 