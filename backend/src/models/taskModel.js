import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Task = model("Task", taskSchema)

export default Task