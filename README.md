# Task Management API

Uma API RESTful para gerenciamento de tarefas e usuários construída com Node.js, Express, TypeScript e MongoDB, containerizada com Docker.

## Funcionalidades

- Autenticação de usuários com JWT
- Operações CRUD para usuários e tarefas
- Gerenciamento de status de tarefas
- Integração com MongoDB
- Documentação Swagger
- Containerização com Docker
- Validação de dados com Zod
- Testes unitários
- Versionamento de API (v1)

## Validação de Dados

A API utiliza Zod para validação de dados, garantindo a integridade e consistência das informações. Regras de validação incluem:

### Usuários

- Username: 3-50 caracteres
- Email: formato válido, 5-100 caracteres
- Senha: 6-100 caracteres, deve conter:
  - Pelo menos uma letra maiúscula
  - Pelo menos uma letra minúscula
  - Pelo menos um número

### Tarefas

- Título: 3-100 caracteres
- Descrição: 10-500 caracteres
- Status: enum ('pendente', 'em_andamento', 'concluida')

## Pré-requisitos

- Docker
- Docker Compose
- Git

## Instalação e Execução com Docker

1. Clone o repositório:

```bash
git clone [url-do-repositorio]
cd ts-tasks-api
```

2. Inicie os containers com Docker Compose:

```bash
docker compose up -d
```

A aplicação estará disponível em:

- API: http://localhost:8080/api/v1
- Documentação Swagger: http://localhost:8080/api-docs

Para parar os containers:

```bash
docker compose down
```

Para remover os volumes (isso apagará os dados do MongoDB):

```bash
docker compose down -v
```

## Estrutura do Docker

O projeto utiliza dois containers:

1. **API (Node.js)**

   - Imagem base: node:18-alpine
   - Porta: 8080
   - Variáveis de ambiente configuráveis
   - Compilação TypeScript automática

2. **MongoDB**
   - Imagem: mongo:latest
   - Porta: 27017
   - Inicialização automática do banco

## Variáveis de Ambiente

As variáveis de ambiente são configuradas no `docker-compose.yml`:

```yaml
# API
PORT=8080
MONGO_URL=mongodb://root:example@mongodb:27017/task-api?authSource=admin
JWT_SECRET=seu_jwt_secret

# MongoDB
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example
MONGO_INITDB_DATABASE=task-api
```

## Endpoints da API (v1)

### Autenticação

- `POST /api/v1/auth/register` - Registrar novo usuário
- `POST /api/v1/auth/login` - Login de usuário

### Usuários

- `GET /api/v1/users` - Listar todos os usuários
- `PUT /api/v1/users/:id` - Atualizar usuário
- `DELETE /api/v1/users/:id` - Excluir usuário

### Tarefas

- `POST /api/v1/tasks` - Criar nova tarefa
- `GET /api/v1/tasks` - Listar todas as tarefas do usuário autenticado
- `PUT /api/v1/tasks/:id` - Atualizar tarefa
- `PATCH /api/v1/tasks/:id/status` - Atualizar status da tarefa
- `DELETE /api/v1/tasks/:id` - Excluir tarefa

## Status de Tarefas Disponíveis

- `pendente`
- `em_andamento`
- `concluida`

## Desenvolvimento Local

Todas as rotas, exceto `/api/v1/auth/register` e `/api/v1/auth/login`, requerem autenticação JWT.
Inclua o token JWT no header Authorization:

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto:

```env
PORT=8080
MONGO_URL=sua-url-do-mongodb
JWT_SECRET=sua-chave-secreta-para-jwt
```

3. Execute em modo desenvolvimento:

```bash
npm run dev
```

## Testes

Execute os testes:

```bash
# No container
docker compose exec app npm test

# Localmente
npm test
```

## Logs

Para visualizar logs dos containers:

```bash
# Todos os logs
docker compose logs

# Logs da API
docker compose logs app

# Logs do MongoDB
docker compose logs mongodb

# Logs em tempo real
docker compose logs -f
```

## Estrutura do Projeto

```
.
├── Dockerfile              # Configuração do container da API
├── docker-compose.yml      # Configuração dos serviços
├── mongo-init.js          # Script de inicialização do MongoDB
├── src/
│   ├── controllers/       # Controladores da aplicação
│   ├── models/           # Modelos do Mongoose
│   ├── routes/           # Rotas da API
│   │   └── v1/          # Rotas da versão 1
│   ├── services/        # Lógica de negócios
│   ├── middleware/      # Middlewares
│   ├── schemas/         # Schemas de validação (Zod)
│   ├── constants/       # Constantes e mensagens
│   └── test/           # Testes unitários
└── package.json
```

## Exemplos de Requisições

### Criar Usuário

```json
POST /api/v1/auth/register
{
    "username": "JohnDoe",
    "email": "john@example.com",
    "password": "Test123"
}
```

### Criar Tarefa

```json
POST /api/v1/tasks
{
    "title": "Implementar API",
    "description": "Desenvolver endpoints da API REST",
    "status": "pendente"
}
```

### Atualizar Status da Tarefa

```json
PATCH /api/v1/tasks/:id/status
{
    "status": "em_andamento"
}
```

## Respostas de Erro

A API retorna respostas de erro consistentes:

```json
{
  "status": "error",
  "message": "Erro de validação",
  "errors": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

## Autenticação

Todas as rotas (exceto `/api/v1/auth/register` e `/api/v1/auth/login`) requerem autenticação JWT.
Inclua o token JWT no header Authorization:
