export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'API de Gerenciamento de Tasks',
        version: '1.0.0',
        description: 'API para gerenciamento de tarefas e usuarios'
    },
    servers: [
        {
            url: `http://localhost:8080/api/v1`,
            description: 'Servidor Local - v1'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {
            Task: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'ID da tarefa'
                    },
                    title: {
                        type: 'string',
                        description: 'Título da tarefa'
                    },
                    description: {
                        type: 'string',
                        description: 'Descrição da tarefa'
                    },
                    status: {
                        type: 'string',
                        enum: ['pendente', 'em_andamento', 'concluida'],
                        description: 'Status da tarefa'
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data de criação'
                    },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data de atualização'
                    }
                }
            },
            User: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'ID do usuário'
                    },
                    username: {
                        type: 'string',
                        description: 'Nome do usuário'
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        description: 'Email do usuário'
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data de criação'
                    },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data de atualização'
                    }
                }
            },
            UserInput: {
                type: 'object',
                properties: {
                    username: {
                        type: 'string',
                        description: 'Nome do usuário'
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        description: 'Email do usuário'
                    },
                    password: {
                        type: 'string',
                        format: 'password',
                        description: 'Senha do usuário'
                    }
                },
                required: ['username', 'email', 'password']
            },
            TaskInput: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        description: 'Título da tarefa'
                    },
                    description: {
                        type: 'string',
                        description: 'Descrição da tarefa'
                    },
                    status: {
                        type: 'string',
                        enum: ['pendente', 'em_andamento', 'concluida'],
                        description: 'Status da tarefa (opcional, padrão: pendente)'
                    }
                },
                required: ['title', 'description']
            },
            TaskUpdateInput: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        description: 'Título da tarefa'
                    },
                    description: {
                        type: 'string',
                        description: 'Descrição da tarefa'
                    },
                    status: {
                        type: 'string',
                        enum: ['pendente', 'em_andamento', 'concluida'],
                        description: 'Status da tarefa'
                    }
                }
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'Mensagem de erro'
                    },
                    validStatuses: {
                        type: 'array',
                        items: {
                            type: 'string'
                        },
                        description: 'Lista de status válidos'
                    }
                }
            }
        }
    },
    paths: {
        '/auth/register': {
            post: {
                tags: ['Autenticação'],
                summary: 'Registrar novo usuário',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UserInput'
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: 'Usuário registrado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        user: {
                                            $ref: '#/components/schemas/User'
                                        },
                                        token: {
                                            type: 'string'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: 'Dados inválidos'
                    }
                }
            }
        },
        '/auth/login': {
            post: {
                tags: ['Autenticação'],
                summary: 'Login do usuário',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: {
                                        type: 'string',
                                        format: 'email'
                                    },
                                    password: {
                                        type: 'string',
                                        format: 'password'
                                    }
                                },
                                required: ['email', 'password']
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Login realizado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        user: {
                                            $ref: '#/components/schemas/User'
                                        },
                                        token: {
                                            type: 'string'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: 'Credenciais inválidas'
                    }
                }
            }
        },
        '/users': {
            get: {
                tags: ['Usuários'],
                summary: 'Listar todos os usuários',
                security: [{ bearerAuth: [] as string[] }],
                responses: {
                    200: {
                        description: 'Lista de usuários',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/User'
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: 'Não autorizado'
                    }
                }
            }
        },
        '/users/{id}': {
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            put: {
                tags: ['Usuários'],
                summary: 'Atualizar usuário',
                security: [{ bearerAuth: [] as string[] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UserInput'
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Usuário atualizado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User'
                                }
                            }
                        }
                    },
                    403: {
                        description: 'Não autorizado a atualizar outro usuário'
                    },
                    404: {
                        description: 'Usuário não encontrado'
                    }
                }
            },
            delete: {
                tags: ['Usuários'],
                summary: 'Excluir usuário',
                security: [{ bearerAuth: [] as string[] }],
                responses: {
                    200: {
                        description: 'Usuário excluído com sucesso'
                    },
                    403: {
                        description: 'Não autorizado a deletar outro usuário'
                    },
                    404: {
                        description: 'Usuário não encontrado'
                    }
                }
            }
        },
        '/tasks': {
            get: {
                tags: ['Tarefas'],
                summary: 'Listar todas as tarefas do usuário',
                security: [{ bearerAuth: [] as string[] }],
                responses: {
                    200: {
                        description: 'Lista de tarefas',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Task'
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: 'Não autorizado'
                    }
                }
            },
            post: {
                tags: ['Tarefas'],
                summary: 'Criar nova tarefa',
                security: [{ bearerAuth: [] as string[] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/TaskInput'
                            },
                            example: {
                                title: "Implementar autenticação",
                                description: "Adicionar JWT para autenticação de usuários",
                                status: "pendente"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: 'Tarefa criada com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string',
                                            example: 'Tarefa criada com sucesso'
                                        },
                                        task: {
                                            $ref: '#/components/schemas/Task'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: 'Status inválido',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse'
                                },
                                example: {
                                    message: "Status inválido",
                                    validStatuses: ["pendente", "em_andamento", "concluida"]
                                }
                            }
                        }
                    },
                    401: {
                        description: 'Não autorizado'
                    }
                }
            }
        },
        '/tasks/{id}': {
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            put: {
                tags: ['Tarefas'],
                summary: 'Atualizar uma tarefa',
                security: [{ bearerAuth: [] as string[] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID da tarefa',
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/TaskUpdateInput'
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Tarefa atualizada com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string'
                                        },
                                        task: {
                                            $ref: '#/components/schemas/Task'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: 'Dados inválidos',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse'
                                }
                            }
                        }
                    },
                    401: {
                        description: 'Não autorizado'
                    },
                    404: {
                        description: 'Tarefa não encontrada'
                    }
                }
            },
            delete: {
                tags: ['Tarefas'],
                summary: 'Excluir tarefa',
                security: [{ bearerAuth: [] as string[] }],
                responses: {
                    200: {
                        description: 'Tarefa excluída com sucesso'
                    },
                    404: {
                        description: 'Tarefa não encontrada'
                    }
                }
            }
        },
        '/tasks/{id}/status': {
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            patch: {
                tags: ['Tarefas'],
                summary: 'Atualizar status da tarefa',
                security: [{ bearerAuth: [] as string[] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        enum: ['pendente', 'em_andamento', 'concluida']
                                    }
                                },
                                required: ['status']
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Status atualizado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string',
                                            example: 'Status atualizado com sucesso'
                                        },
                                        task: {
                                            $ref: '#/components/schemas/Task'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: 'Status inválido',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse'
                                },
                                example: {
                                    message: "Status inválido",
                                    validStatuses: ["pendente", "em_andamento", "concluida"]
                                }
                            }
                        }
                    },
                    404: {
                        description: 'Tarefa não encontrada'
                    }
                }
            }
        }
    }
}; 