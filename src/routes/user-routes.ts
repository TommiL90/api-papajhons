import { Router } from 'express'

import { UserController } from '@/controllers/user-controller'
import { AuthSchema, CreateUserSchema } from '@/schemas/user-schema'
import { BodyValidationMiddleware } from '@/middlewares/body-validation-middleware'

const userRouter: Router = Router()
const userController = new UserController()

userRouter.post(
  '/register',
  BodyValidationMiddleware.execute(CreateUserSchema),
  userController.createUser,
)
userRouter.post(
  '/session',
  BodyValidationMiddleware.execute(AuthSchema),
  userController.authUser,
)

userRouter.get('', userController.findAll)

userRouter.get(
  '/:id',

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
