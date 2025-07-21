import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import admissionRouter from "./router/admissionRouter.js"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

app.get('/', (req, res) =>{
    res.send("hello world")
})

app.use('/api/student', admissionRouter)

export default app