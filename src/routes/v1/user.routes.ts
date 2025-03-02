import { Router } from 'express';
import { UserController } from '../../controllers/UserController';
import { authenticateToken } from '../../middleware/auth';

const router = Router();

// Todas as rotas de usuário são protegidas
router.use(authenticateToken);

router.get('/', UserController.getAllUsers);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router; 