import { Router } from 'express'

import { UserController } from '@/controllers/user/user.controllers'
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
  '/login',
  BodyValidationMiddleware.execute(AuthSchema),
  userController.authUser,
)
// userRouter.patch(
//   '/:id',
//   userMiddlewares.validateTokenMiddleware,
//   userMiddlewares.verifyOwnerMiddleware,
//   middlewares.validateBodyMiddleware(updateUserSchema),
//   userControllers.updateUser,
// )
// userRouter.delete(
//   '/:id',
//   userMiddlewares.validateTokenMiddleware,
//   userMiddlewares.verifyOwnerMiddleware,
//   userControllers.deleteUser,
// )
// userRouter.get('', userControllers.listUsers)
// userRouter.get(
//   '/user',
//   userMiddlewares.validateTokenMiddleware,
//   userControllers.rerieveUser,
// )

export default userRouter
