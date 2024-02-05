import { CreatePurchaseOrders } from '@/interfaces/purchase-order-interfaces'
import { makeCreatePurchaseOrder } from '@/services/purchase-orders/factories/make-create-purchase-order'
import { makeDeliveredPurchaseOrder } from '@/services/purchase-orders/factories/make-delivered-purchase-order'
import { makeFailurePurchaseOrder } from '@/services/purchase-orders/factories/make-failure-purchase-order copy'
import { makeFindAllByUserId } from '@/services/purchase-orders/factories/make-find-all-by-user-id-purchase-order'
import { makeFindAllPurchaseOrders } from '@/services/purchase-orders/factories/make-find-all-purchase-order'
import { makeFindById } from '@/services/purchase-orders/factories/make-find-by-id-purchase-order'
import { makePayPurchaseOrder } from '@/services/purchase-orders/factories/make-pay-purchase-order'
import { makeSendPurchaseOrder } from '@/services/purchase-orders/factories/make-send-purchase-order'
import { Request, Response } from 'express'

export class PurchaseOrdersController {
  create = async (req: Request, res: Response) => {
    const data: CreatePurchaseOrders = req.body

    const create = makeCreatePurchaseOrder()

    const newProduct = await create(data)

    return res.status(201).json(newProduct)
  }

  findById = async (req: Request, res: Response) => {
    const { id } = req.params

    const purchaseOrder = makeFindById()

    const products = await purchaseOrder(id)

    return res.status(200).json(products)
  }

  findAllByUserId = async (req: Request, res: Response) => {
    const userId = res.locals.userId

    const makeListPurchaseOrders = makeFindAllByUserId()

    const purchaseOrders = await makeListPurchaseOrders(userId)

    return res.status(200).json(purchaseOrders)
  }

  findAll = async (req: Request, res: Response) => {
    const makeListPurchaseOrders = makeFindAllPurchaseOrders()

    const purchaseOrders = await makeListPurchaseOrders()

    return res.status(200).json(purchaseOrders)
  }

  pay = async (req: Request, res: Response) => {
    const { id } = req.params

    const pay = makePayPurchaseOrder()

    const updatedProduct = await pay(id)

    return res.status(200).json(updatedProduct)
  }

  send = async (req: Request, res: Response) => {
    const { id } = req.params

    const send = makeSendPurchaseOrder()

    const updatedProduct = await send(id, req.body)

    return res.status(200).json(updatedProduct)
  }

  delivered = async (req: Request, res: Response) => {
    const { id } = req.params

    const delivered = makeDeliveredPurchaseOrder()

    const updatedProduct = await delivered(id)

    return res.status(200).json(updatedProduct)
  }

  failure = async (req: Request, res: Response) => {
    const { id } = req.params

    const failure = makeFailurePurchaseOrder()

    const updatedProduct = await failure(id)

    return res.status(200).json(updatedProduct)
  }
}
