import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import admissionRouter from "./router/admissionRouter.js"
import feeRouter from "./router/feesRouter.js"
import examRouter from "./router/examRoutes.js"
dotenv.config()

const app = express()
app.use(cors({
  origin: ['https://school-managment-one.vercel.app', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json())

connectDB()

app.get('/', (req, res) =>{
    res.send("hello world")
})

app.use('/api/student', admissionRouter)
app.use('/api/fee', feeRouter)
app.use('/api/exam', examRouter)

export default app