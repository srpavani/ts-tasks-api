import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { IUser } from '../models/User';
import dotenv from 'dotenv';
import { MESSAGES } from '../constants/messages';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não esta defenido no .env');
}

interface AuthRequest extends Request {
    user?: IUser;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: MESSAGES.AUTH.NO_TOKEN });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const user = await UserRepository.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: MESSAGES.AUTH.USER_NOT_FOUND });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: MESSAGES.AUTH.INVALID_TOKEN });
    }
}; 