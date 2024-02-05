import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/user-routes'
import { errorHandler } from './errors/AppError'
import productRouter from './routes/product/product-routes'
import categoryRouter from './routes/category/category-routes'
import purchaseOrders from './routes/purchase-orders/purchase-orders'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({ msg: 'Hello world!' })
})

// app.use('/users', userRouter)
// app.use('/products', productRouter)
// app.use('/categories', categoryRouter)
// app.use('/orders', purchaseOrders)

// app.use(errorHandler)

export default app
