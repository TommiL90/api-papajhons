import { ProductController } from '@/controllers/products/product-controller'
import { Router } from 'express'

const productRouter: Router = Router()
const productController = new ProductController()

productRouter.get('', productController.FindAll)

export default productRouter
