import { Router } from 'express'
import userController from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'
const userRouter = Router()


// Public Routes
userRouter.get("/", userController.home)
userRouter.post('/register', userController.userRegister)
userRouter.post('/login', userController.userLogin)

// Private Routes
userRouter.get('/me', authMiddleware, userController.getCurrentUser)
userRouter.put('/profile', authMiddleware, userController.updateUserProfile)
userRouter.put('/password', authMiddleware, userController.updateUserPassword)



export default userRouter