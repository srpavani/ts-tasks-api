import { Router } from 'express';
import { TaskController } from '../../controllers/TaskController';
import { authenticateToken } from '../../middleware/auth';

const router = Router();

// Todas as rotas de tarefas são protegidas
router.use(authenticateToken);

router.post('/', TaskController.createTask);
router.get('/', TaskController.getAllTasks);
router.put('/:id', TaskController.updateTask);
router.patch('/:id/status', TaskController.updateTaskStatus);
router.delete('/:id', TaskController.deleteTask);

export default router; 