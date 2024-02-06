import { PurchaseOrdersController } from '@/controllers/purchase-order-controller'
import { Router } from 'express'

const purchaseOrders: Router = Router()
const purchaseOrder = new PurchaseOrdersController()

purchaseOrders.post('', purchaseOrder.create)

purchaseOrders.get('/:id', purchaseOrder.findById)

purchaseOrders.get('/user/:userId', purchaseOrder.findAllByUserId)

purchaseOrders.get('', purchaseOrder.findAll)

purchaseOrders.patch('/pay/:id', purchaseOrder.pay)

purchaseOrders.patch('/send/:id', purchaseOrder.send)

purchaseOrders.patch('/delivered/:id', purchaseOrder.delivered)

purchaseOrders.patch('/failure/:id', purchaseOrder.failure)

export default purchaseOrders
