# Task Management API

Uma API RESTful para gerenciamento de tarefas e usuários construída com Node.js, Express, TypeScript e MongoDB.

#Se preferir usar o docker, existe uma branch chamada docker

## Funcionalidades

- Autenticação de usuários com JWT
- Operações CRUD para usuários e tarefas
- Gerenciamento de status de tarefas
- Integração com MongoDB
- Suporte a TypeScript
- Documentação Swagger
- Testes unitários
- Versionamento de API (v1)

## Pré-requisitos

- Node.js (v14 ou superior)
- MongoDB
- npm ou yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=8080
MONGO_URL=sua-url-do-mongodb
JWT_SECRET=sua-chave-secreta-para-jwt
```

## Executando a Aplicação

```bash
npm start
```

## Testes

O projeto utiliza Jest para testes unitários. Você pode executar os testes de diferentes maneiras:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (observa alterações)
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage
```

### Estrutura dos Testes

Os testes estão organizados na pasta `src/test` e seguem a seguinte estrutura:

```
src/test/
├── setup.ts              # Configuração global dos testes
├── TaskService.test.ts   # Testes do serviço de tarefas
└── UserService.test.ts   # Testes do serviço de usuários
```

### Comandos Úteis no Modo Watch

Ao executar `npm run test:watch`, você terá acesso a um menu interativo com as seguintes opções:

- `a` - Executar todos os testes
- `f` - Executar apenas testes que falharam
- `p` - Filtrar testes por nome do arquivo
- `t` - Filtrar testes por nome do teste
- `q` - Sair do modo watch
- `Enter` - Executar os testes novamente

## Documentação da API

A documentação completa da API está disponível através do Swagger UI em:

```
http://localhost:8080/api-docs
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

## Autenticação

Todas as rotas, exceto `/api/v1/auth/register` e `/api/v1/auth/login`, requerem autenticação JWT.
Inclua o token JWT no header Authorization:

```
Authorization: Bearer <seu-token>
```

## Estrutura do Projeto

```
src/
├── controllers/     # Controladores da aplicação
├── models/         # Modelos do Mongoose
├── routes/         # Rotas da API
│   └── v1/         # Rotas da versão 1
├── services/       # Lógica de negócios
├── middleware/     # Middlewares
├── constants/      # Constantes e mensagens
└── test/          # Testes unitários
```

## Scripts Disponíveis

```bash
# Iniciar a aplicação em modo desenvolvimento
npm run dev

# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```
