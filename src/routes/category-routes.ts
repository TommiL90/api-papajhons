import { CategoryController } from '@/controllers/category-controller'
import { verifyOwnerMiddleware } from '@/middlewares/verify-owner-middleware'
import { verifyTokenMiddleware } from '@/middlewares/verify-token-middleware'
import { Role } from '@prisma/client'

import { Router } from 'express'

const categoryRouter: Router = Router()
const categoryController = new CategoryController()

categoryRouter.post(
  '',
  verifyTokenMiddleware,
  verifyOwnerMiddleware(Role.ADMIN),
  categoryController.create,
)

categoryRouter.get('/:id', categoryController.findById)

categoryRouter.get('', categoryController.findAll)

categoryRouter.patch(
  '/:id',
  verifyTokenMiddleware,
  verifyOwnerMiddleware(Role.ADMIN),
  categoryController.update,
)

categoryRouter.delete(
  '/:id',
  verifyTokenMiddleware,
  verifyOwnerMiddleware(Role.ADMIN),
  categoryController.delete,
)

export default categoryRouter
