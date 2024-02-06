import { ProductController } from '@/controllers/product-controller'
import { verifyOwnerMiddleware } from '@/middlewares/verify-owner-middleware'
import { verifyTokenMiddleware } from '@/middlewares/verify-token-middleware'
import { Role } from '@prisma/client'
import { Router } from 'express'

const productRouter: Router = Router()
const productController = new ProductController()

productRouter.post(
  '',
  verifyTokenMiddleware,
  verifyOwnerMiddleware(Role.ADMIN),
  productController.createProduct,
)

productRouter.get('/:id', productController.findById)

productRouter.get('', productController.findAll)

productRouter.patch(
  '/:id',
  verifyTokenMiddleware,
  verifyOwnerMiddleware(Role.ADMIN),
  productController.update,
)

productRouter.delete(
  '/:id',
  verifyTokenMiddleware,
  verifyOwnerMiddleware(Role.ADMIN),
  productController.delete,
)

export default productRouter
