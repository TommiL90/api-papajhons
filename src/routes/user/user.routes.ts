import { Router } from 'express'
import userControllers from '../../controllers/user/user.controllers'
import middlewares from '../../middlewares'
import {
  createUserSchema,
  loginSchema,
  updateUserSchema,
} from '../../schemas/user-schema'
import userMiddlewares from '../../middlewares/user.middlewares'

const userRouter: Router = Router()

userRouter.post(
  '/register',
  middlewares.validateBodyMiddleware(createUserSchema),
  userControllers.createUser,
)
userRouter.post(
  '/login',
  middlewares.validateBodyMiddleware(loginSchema),
  userControllers.loginUser,
)
userRouter.patch(
  '/:id',
  userMiddlewares.validateTokenMiddleware,
  userMiddlewares.verifyOwnerMiddleware,
  middlewares.validateBodyMiddleware(updateUserSchema),
  userControllers.updateUser,
)
userRouter.delete(
  '/:id',
  userMiddlewares.validateTokenMiddleware,
  userMiddlewares.verifyOwnerMiddleware,
  userControllers.deleteUser,
)
userRouter.get('', userControllers.listUsers)
userRouter.get(
  '/user',
  userMiddlewares.validateTokenMiddleware,
  userControllers.rerieveUser,
)

export default userRouter
