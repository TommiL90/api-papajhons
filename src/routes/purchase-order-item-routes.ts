import { PurchaseOrderItemController } from '@/controllers/purchase-order-item-controller'
import { validateBodyMiddleware } from '@/middlewares/body-validation-middleware'
import { CreatePurchaseOrderItemSchema } from '@/schemas/purchase-order-item-schema'
import { Router } from 'express'

const productPurchaseOrderItemRouter: Router = Router()
const productPurchaseOrderItem = new PurchaseOrderItemController()

productPurchaseOrderItemRouter.post(
  '',
  validateBodyMiddleware(CreatePurchaseOrderItemSchema),
  productPurchaseOrderItem.create,
)

export default productPurchaseOrderItemRouter
