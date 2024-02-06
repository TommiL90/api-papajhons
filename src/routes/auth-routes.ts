import { Router } from 'express'

import { AuthSchema } from '@/schemas/user-schema'
import { validateBodyMiddleware } from '@/middlewares/body-validation-middleware'
import { AuthController } from '@/controllers/auth-controller'

const authRoute: Router = Router()
const authController = new AuthController()

authRoute.post('', validateBodyMiddleware(AuthSchema), authController.authorize)

export default authRoute
