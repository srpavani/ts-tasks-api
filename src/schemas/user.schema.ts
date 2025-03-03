import { z } from 'zod';
import { ValidationConfig as config } from '../config/validation.config';

// Base schema para usuário
export const userBaseSchema = z.object({
    username: z.string()
        .min(config.USER.USERNAME.MIN, config.ERROR_MESSAGES.VALIDATION.USERNAME.MIN)
        .max(config.USER.USERNAME.MAX, config.ERROR_MESSAGES.VALIDATION.USERNAME.MAX),
    email: z.string()
        .email(config.ERROR_MESSAGES.VALIDATION.EMAIL.INVALID)
        .min(config.USER.EMAIL.MIN, config.ERROR_MESSAGES.VALIDATION.EMAIL.MIN)
        .max(config.USER.EMAIL.MAX, config.ERROR_MESSAGES.VALIDATION.EMAIL.MAX),
});

// Schema para criação de usuário (inclui senha)
export const userCreateSchema = userBaseSchema.extend({
    password: z.string()
        .min(config.USER.PASSWORD.MIN, config.ERROR_MESSAGES.VALIDATION.PASSWORD.MIN)
        .max(config.USER.PASSWORD.MAX, config.ERROR_MESSAGES.VALIDATION.PASSWORD.MAX)
        .regex(
            config.USER.PASSWORD.REGEX,
            config.ERROR_MESSAGES.VALIDATION.PASSWORD.PATTERN
        ),
});

// Schema para atualização de usuário (todos os campos são opcionais)
export const userUpdateSchema = userBaseSchema
    .extend({
        password: z.string()
            .min(config.USER.PASSWORD.MIN, config.ERROR_MESSAGES.VALIDATION.PASSWORD.MIN)
            .max(config.USER.PASSWORD.MAX, config.ERROR_MESSAGES.VALIDATION.PASSWORD.MAX)
            .regex(
                config.USER.PASSWORD.REGEX,
                config.ERROR_MESSAGES.VALIDATION.PASSWORD.PATTERN
            ),
    })
    .partial();

// Schema para login
export const userLoginSchema = z.object({
    email: z.string().email(config.ERROR_MESSAGES.VALIDATION.EMAIL.INVALID),
    password: z.string().min(1, 'Senha é obrigatória'),
});

// Types
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>; 