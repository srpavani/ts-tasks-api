export interface ValidationError {
    field: string;
    message: string;
}

export interface ErrorResponse {
    status: 'error';
    message: string;
    errors?: ValidationError[];
}

export interface ValidationErrorResponse extends ErrorResponse {
    errors: ValidationError[];
} 