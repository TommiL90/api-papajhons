import { ProductController } from '@/controllers/product-controller'
import { Router } from 'express'

const productRouter: Router = Router()
const productController = new ProductController()

productRouter.post('', productController.createProduct)

productRouter.get('/:id', productController.findById)

productRouter.get('', productController.findAll)

productRouter.patch('/:id', productController.update)

productRouter.delete('/:id', productController.delete)

export default productRouter
