//algumas mensagens

export const MESSAGES = {
    AUTH: {
        NOT_AUTHENTICATED: 'Usuário não autenticado',
        INVALID_TOKEN: 'Token inválido',
        NO_TOKEN: 'Token não fornecido',
        USER_NOT_FOUND: 'Usuário não encontrado',
        EMAIL_REGISTERED: 'Email já cadastrado',
        INVALID_PASSWORD: 'Senha inválida',
        LOGIN_SUCCESS: 'Login realizado com sucesso',
        REGISTER_SUCCESS: 'Usuário registrado com sucesso'
    },
    TASK: {
        NOT_FOUND: 'Tarefa não encontrada',
        INVALID_STATUS: (validStatuses: string[]) => `Status inválido. Status permitidos: ${validStatuses.join(', ')}`,
        DELETED: 'Tarefa excluída com sucesso',
        NO_TASKS: 'Nenhuma tarefa encontrada',
        CREATED: 'Tarefa criada com sucesso',
        UPDATED: 'Tarefa atualizada com sucesso',
        STATUS_UPDATED: 'Status da tarefa atualizado com sucesso',
        TITLE_REQUIRED: 'O título da tarefa é obrigatório',
        DESCRIPTION_REQUIRED: 'A descrição da tarefa é obrigatória',
        INVALID_ID: 'ID da tarefa inválido',
        NOT_OWNER: 'Você não tem permissão para acessar esta tarefa'
    },
    USER: {
        DELETED: 'Usuário excluído com sucesso',
        UPDATED: 'Usuário atualizado com sucesso',
        NO_USERS: 'Nenhum usuário encontrado',
        USERNAME_REQUIRED: 'O nome de usuário é obrigatório',
        EMAIL_REQUIRED: 'O email é obrigatório',
        PASSWORD_REQUIRED: 'A senha é obrigatória',
        INVALID_EMAIL: 'Email inválido',
        INVALID_ID: 'ID do usuário inválido',
        NOT_AUTHORIZED: 'Não autorizado a modificar outro usuário'
    },
    SERVER: {
        ERROR: 'Erro interno do servidor',
        MONGODB_ERROR: 'Erro na conexão com o MongoDB',
        VALIDATION_ERROR: 'Erro de validação',
        ROUTE_NOT_FOUND: 'Rota não encontrada'
    },
    VALIDATION: {
        USERNAME: {
            MIN: 'Username deve ter no mínimo 3 caracteres',
            MAX: 'Username deve ter no máximo 50 caracteres'
        },
        EMAIL: {
            INVALID: 'Email inválido',
            MIN: 'Email deve ter no mínimo 5 caracteres',
            MAX: 'Email deve ter no máximo 100 caracteres'
        },
        PASSWORD: {
            MIN: 'Senha deve ter no mínimo 6 caracteres',
            MAX: 'Senha deve ter no máximo 100 caracteres',
            PATTERN: 'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
        },
        TASK: {
            TITLE: {
                MIN: 'Título deve ter no mínimo 3 caracteres',
                MAX: 'Título deve ter no máximo 100 caracteres'
            },
            DESCRIPTION: {
                MIN: 'Descrição deve ter no mínimo 10 caracteres',
                MAX: 'Descrição deve ter no máximo 500 caracteres'
            },
            STATUS: 'Status inválido. Use: pendente, em_andamento ou concluida'
        }
    }
}; 