import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/user/user-routes'
import { errorHandler } from './errors/AppError'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', userRouter)

app.use(errorHandler)

export default app
