import { Router } from 'express'

import { UserController } from '@/controllers/user-controller'
import { CreateUserSchema } from '@/schemas/user-schema'
import { validateBodyMiddleware } from '@/middlewares/body-validation-middleware'
import { verifyTokenMiddleware } from '@/middlewares/verify-token-middleware'
import { verifyOwnerMiddleware } from '@/middlewares/verify-owner-middleware'
import { Role } from '@prisma/client'

const userRouter: Router = Router()
const userController = new UserController()

userRouter.post(
  '/register',
  validateBodyMiddleware(CreateUserSchema),
  userController.createUser,
)

userRouter.get(
  '',
  verifyTokenMiddleware,
  verifyOwnerMiddleware(Role.ADMIN),
  userController.findAll,
)

userRouter.get(
  '/:id',
  verifyTokenMiddleware,
  verifyOwnerMiddleware(),
  userController.findById,
)

userRouter.patch(
  '/:id',
  verifyTokenMiddleware,
  verifyOwnerMiddleware(),
  userController.update,
)

userRouter.delete(
  '/:id',
  verifyTokenMiddleware,
  verifyOwnerMiddleware(),
  userController.delete,
)

export default userRouter
