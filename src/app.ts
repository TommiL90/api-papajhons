import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/user/user-routes'
import { errorHandler } from './errors/AppError'
import productRouter from './routes/product/product-routes'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({ msg: 'Hello world!' })
})

app.use('/users', userRouter)
app.use('/products', productRouter)

app.use(errorHandler)

export default app
