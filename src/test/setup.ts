import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { jest } from '@jest/globals';

dotenv.config();

beforeAll(async () => {
    const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/task-api-teste';
    await mongoose.connect(MONGO_URL);
});

afterEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close();
}); 