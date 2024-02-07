import { ProductController } from '@/controllers/product-controller'
import { validateBodyMiddleware } from '@/middlewares/body-validation-middleware'
import { verifyOwnerMiddleware } from '@/middlewares/verify-owner-middleware'
import { verifyTokenMiddleware } from '@/middlewares/verify-token-middleware'
import {
  CreateProductSchema,
  UpdateProductSchema,
} from '@/schemas/product-schema'
import { Role } from '@prisma/client'
import { Router } from 'express'

const productRouter: Router = Router()
const productController = new ProductController()

productRouter.post(
  '',
  verifyTokenMiddleware,
  verifyOwnerMiddleware(Role.ADMIN),
  validateBodyMiddleware(CreateProductSchema),
  productController.createProduct,
)

productRouter.get('/:id', productController.findById)

productRouter.get('', productController.findAll)

productRouter.patch(
  '/:id',
  verifyTokenMiddleware,
  verifyOwnerMiddleware(Role.ADMIN),
  validateBodyMiddleware(UpdateProductSchema),
  productController.update,
)

productRouter.delete(
  '/:id',
  verifyTokenMiddleware,
  verifyOwnerMiddleware(Role.ADMIN),
  productController.delete,
)

export default productRouter
