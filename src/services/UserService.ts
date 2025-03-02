import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { IUser } from '../models/User';
import dotenv from 'dotenv';

// Garantir que as variáveis de ambiente sejam carregadas
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido nas variáveis de ambiente');
}

export class UserService {
    static async register(userData: { username: string; email: string; password: string }): Promise<{ user: IUser; token: string }> {
        const existingUser = await UserRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await UserRepository.create({
            ...userData,
            password: hashedPassword
        });

        const token = this.generateToken(user);
        return { user, token };
    }

    static async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
        const user = await UserRepository.findByEmailWithPassword(email);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Senha inválida');
        }

        const token = this.generateToken(user);
        return { user, token };
    }

    static async getAllUsers(): Promise<IUser[]> {
        return UserRepository.findAll();
    }

    static async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        return UserRepository.update(id, userData);
    }

    static async deleteUser(id: string): Promise<IUser | null> {
        return UserRepository.delete(id);
    }

    private static generateToken(user: IUser): string {
        return jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
    }
} 