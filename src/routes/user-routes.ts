import { Router } from 'express'

import { UserController } from '@/controllers/user-controller'
import { CreateUserSchema } from '@/schemas/user-schema'
import { validateBodyMiddleware } from '@/middlewares/body-validation-middleware'
import { verifyTokenMiddleware } from '@/middlewares/verify-token-middleware'
import { verifyOwnerMiddleware } from '@/middlewares/verify-owner-middleware'

const userRouter: Router = Router()
const userController = new UserController()

userRouter.post(
  '/register',
  validateBodyMiddleware(CreateUserSchema),
  userController.createUser,
)

userRouter.get('', userController.findAll)

userRouter.get(
  '/:id',
  verifyTokenMiddleware,
  verifyOwnerMiddleware,
  userController.findById,
)

userRouter.patch(
  '/:id',

  // middlewares.validateBodyMiddleware(updateUserSchema),
  userController.update,
)

userRouter.delete(
  '/:id',

  userController.delete,
)

export default userRouter
