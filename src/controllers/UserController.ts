import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { MESSAGES } from '../constants/messages';

interface AuthRequest extends Request {
    user?: any;
}

export class UserController {
    static async register(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;
            const result = await UserService.register({ username, email, password });
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await UserService.login(email, password);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }
    }

    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            if (!users || users.length === 0) {
                return res.status(404).json({ message: MESSAGES.USER.NO_USERS });
            }
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateUser(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            // Verificar se o usuário está tentando atualizar seu próprio perfil
            if (req.user && req.user._id.toString() !== id) {
                return res.status(403).json({ message: 'Não autorizado a atualizar outro usuário' });
            }

            const userData = req.body;
            const user = await UserService.updateUser(id, userData);
            
            if (!user) {
                return res.status(404).json({ message: MESSAGES.AUTH.USER_NOT_FOUND });
            }
            
            return res.status(200).json({ 
                message: MESSAGES.USER.UPDATED,
                user 
            });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    static async deleteUser(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            // Verificar se o usuário está tentando deletar seu próprio perfil
            if (req.user && req.user._id.toString() !== id) {
                return res.status(403).json({ message: 'Não autorizado a deletar outro usuário' });
            }

            const user = await UserService.deleteUser(id);
            
            if (!user) {
                return res.status(404).json({ message: MESSAGES.AUTH.USER_NOT_FOUND });
            }
            
            return res.status(200).json({ message: MESSAGES.USER.DELETED });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
} 