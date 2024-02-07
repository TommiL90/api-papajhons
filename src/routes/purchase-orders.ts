import { PurchaseOrdersController } from '@/controllers/purchase-order-controller'
import { validateBodyMiddleware } from '@/middlewares/body-validation-middleware'
import { PurchaseOrdersCreateSchema } from '@/schemas/purchase-orders-schema'
import { Router } from 'express'

const purchaseOrdersRouter: Router = Router()
const purchaseOrder = new PurchaseOrdersController()

purchaseOrdersRouter.post(
  '/create',
  validateBodyMiddleware(PurchaseOrdersCreateSchema),
  purchaseOrder.create,
)

purchaseOrdersRouter.get('/:id', purchaseOrder.findById)

purchaseOrdersRouter.get('/user/:userId', purchaseOrder.findAllByUserId)

purchaseOrdersRouter.get('', purchaseOrder.findAll)

purchaseOrdersRouter.patch('/pay/:id', purchaseOrder.pay)

purchaseOrdersRouter.patch('/send/:id', purchaseOrder.send)

purchaseOrdersRouter.patch('/delivered/:id', purchaseOrder.delivered)

purchaseOrdersRouter.patch('/failure/:id', purchaseOrder.failure)

export default purchaseOrdersRouter
