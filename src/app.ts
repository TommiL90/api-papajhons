import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/user-routes'
import productRouter from './routes/product-routes'
import categoryRouter from './routes/category-routes'
import purchaseOrdersRouter from './routes/purchase-orders'
import authRouter from './routes/auth-routes'
import { handleAppError } from './errors/AppError'
import { env } from './env'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}/${env.PORT}`
  return res.status(200).send({ msg: `Hello world!, ${baseUrl}` })
})

app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/products', productRouter)
app.use('/orders', purchaseOrdersRouter)
app.use('/session', authRouter)

app.use(handleAppError)

export default app
