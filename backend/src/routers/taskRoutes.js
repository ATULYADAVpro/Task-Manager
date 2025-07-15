import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import taskController from '../controllers/taskController.js';
const taskRouter = Router();


taskRouter.route("/gp")
.get(authMiddleware,taskController.getTasks)
.post(authMiddleware,taskController.createTask)

taskRouter.route("/:id/gp")
.get(authMiddleware,taskController.getTaskById)
.put(authMiddleware,taskController.updateTask)
.delete(authMiddleware,taskController.deleteTask)

export default taskRouter