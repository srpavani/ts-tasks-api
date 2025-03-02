import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import v1Router from './routes/v1';
import { swaggerDocument } from './swagger';
import { MESSAGES } from './constants/messages';

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = http.createServer(app);

// mongoDB
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 8080;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('conectado ao MongoDB com sucesso');
    })
    .catch((error: Error) => {
        console.error(MESSAGES.SERVER.MONGODB_ERROR, error);
        process.exit(1);
    });

// rotas da API v1
app.use('/api/v1', v1Router);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: MESSAGES.SERVER.ERROR });
});

server.listen(PORT, () => {
    console.log(`servidor funcionando na porta ${PORT}`);
});