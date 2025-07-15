// importing modules
import express from 'express'
import { PORT } from './src/configs/index.js'
import connectDB from './src/configs/db.js'
import cors from 'cors'
import userRouter from './src/routers/userRoutes.js'
import errorHandler from './src/middleware/errorHandler.js'

// initialize
const app = express()
const port = PORT || 5001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//--- for route middleware
app.use('/api/user', userRouter)

app.get("/",(req,res)=>{
    res.send("This backend for TM")
})


// --- Global Middlware ---
app.use(errorHandler)

// connection and server called
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server start at http://localhost:${port}`)
        })
    })