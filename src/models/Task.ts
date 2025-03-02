import mongoose from "mongoose";

export enum TaskStatus {
    PENDENTE = 'pendente',
    EM_ANDAMENTO = 'em_andamento',
    CONCLUIDA = 'concluida'
}

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
        type: String, 
        enum: Object.values(TaskStatus),
        default: TaskStatus.PENDENTE 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    }
}, {
    timestamps: true
});

export interface ITask extends mongoose.Document {
    title: string;
    description: string;
    status: TaskStatus;
    userId: mongoose.Types.ObjectId;
}

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema); 