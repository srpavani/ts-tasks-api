import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ValidationErrorResponse } from '../types/error.types';
import { MESSAGES } from '../constants/messages';

export const validate = (schema: AnyZodObject) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.parseAsync(req.body);
        return next();
    } catch (error) {
        if (error instanceof ZodError) {
            const response: ValidationErrorResponse = {
                status: 'error',
                message: MESSAGES.SERVER.VALIDATION_ERROR,
                errors: error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            };
            return res.status(400).json(response);
        }
        return res.status(500).json({
            status: 'error',
            message: MESSAGES.SERVER.ERROR
        });
    }
}; 