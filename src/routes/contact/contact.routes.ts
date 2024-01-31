import { Router } from 'express'
import contactControllers from '../../controllers/user/contact.controllers'
import userMiddlewares from '../../middlewares/user.middlewares'
import {
  reqCreateContactSchema,
  updateContactSchema,
} from '../../schemas/contact.schema'
import middlewares from '../../middlewares'

const contactRouter: Router = Router()

contactRouter.post(
  '',
  userMiddlewares.validateTokenMiddleware,
  middlewares.validateBodyMiddleware(reqCreateContactSchema),
  contactControllers.createContact,
)

contactRouter.patch(
  '/:id',
  userMiddlewares.validateTokenMiddleware,
  middlewares.validateBodyMiddleware(updateContactSchema),
  contactControllers.updateContact,
)

contactRouter.delete(
  '/:id',
  userMiddlewares.validateTokenMiddleware,
  contactControllers.deleteContact,
)

contactRouter.get(
  '',
  userMiddlewares.validateTokenMiddleware,
  contactControllers.listContacts,
)

export default contactRouter
