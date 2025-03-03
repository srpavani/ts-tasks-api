import { Router } from 'express';
import { UserController } from '../../controllers/UserController';
import { validate } from '../../middleware/validation';
import { userCreateSchema, userLoginSchema } from '../../schemas/user.schema';

const router = Router();

router.post('/register', validate(userCreateSchema), UserController.register);
router.post('/login', validate(userLoginSchema), UserController.login);

export default router; 