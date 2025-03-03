import { Router } from 'express';
import { TaskController } from '../../controllers/TaskController';
import { authenticateToken } from '../../middleware/auth';
import { validate } from '../../middleware/validation';
import { taskCreateSchema, taskUpdateSchema, taskStatusUpdateSchema } from '../../schemas/task.schema';

const router = Router();

// Todas as rotas de tarefas são protegidas
router.use(authenticateToken);

router.post('/', validate(taskCreateSchema), TaskController.createTask);
router.get('/', TaskController.getAllTasks);
router.put('/:id', validate(taskUpdateSchema), TaskController.updateTask);
router.patch('/:id/status', validate(taskStatusUpdateSchema), TaskController.updateTaskStatus);
router.delete('/:id', TaskController.deleteTask);

export default router; 