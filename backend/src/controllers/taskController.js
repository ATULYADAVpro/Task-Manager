import Task from "../models/taskModel.js"
import CustomErrorHander from "../utils/CustomErrorHandler.js";


const taskController = {
    // Create a new task
    async createTask(req, res, next) {
        try {
            const { title, description, priority, dueDate, completed, owner, createdAt } = req.body
            const task = new Task({ title, description, priority, dueDate, completed: completed === 'Yes' || completed === true, owner: req.user.id, createdAt })
            const saved = await task.save();

            res.json({ task: saved })

        } catch (error) {
            return next(error)
        }
    },

    // Get all task for logged in user
    async getTasks(req, res, next) {
        try {
            const tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: -1 })
            res.json({ tasks })

        } catch (error) {
            return next(error)
        }
    },

    // Get Single task by id
    async getTaskById() {
        try {
            const task = await Task.findOne({ _id: req.params.id, owner: req.user.id })
            if (task) { return next(CustomErrorHander.NotFound("Tasknot foundF")) }

            res.json({ task })
        } catch (error) {
            return next(error)
        }
    },

    // Update a task
    async updateTask() {
        try {
            const data = { ...req.body }
            if (data.completed !== undefined) {
                data.completed === data.completed === 'Yes' || data.completed === true
            }

            const updated = await Task.findOneAndUpdate(
                { _id: req.params.id, owner: req.user.id },
                data,
                { new: true, runValidators: true }
            )
            if (!updated) { return next(CustomErrorHander.NotFound("Task not found")) }

            res.json({ task: updated })
        } catch (error) {
            return next(error)
        }
    },

    // Delete a task 
    async deleteTask(req, res, next) {
        try {
            const deleted = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
            if (!deleted) {
                return next(CustomErrorHander.NotFound("Task not found "))
            }

            res.json({ message: "Task deleted" })
        } catch (error) {
            return next(error)
        }
    }
}

export default taskController