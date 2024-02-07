import { CreatePurchaseOrders } from '@/interfaces/purchase-order-interfaces'
import { makeCreatePurchaseOrder } from '@/services/factories/make-create-purchase-order'
import { makeDeliveredPurchaseOrder } from '@/services/factories/make-delivered-purchase-order'
import { makeFailurePurchaseOrder } from '@/services/factories/make-failure-purchase-order copy'
import { makeFindAllByUserId } from '@/services/factories/make-find-all-by-user-id-purchase-order'
import { makeFindAllPurchaseOrders } from '@/services/factories/make-find-all-purchase-order'
import { makeFindById } from '@/services/factories/make-find-by-id-purchase-order'
import { makePayPurchaseOrder } from '@/services/factories/make-pay-purchase-order'
import { makeSendPurchaseOrder } from '@/services/factories/make-send-purchase-order'
import { Request, Response } from 'express'

export class PurchaseOrdersController {
  create = async (req: Request, res: Response) => {
    const data: CreatePurchaseOrders = req.body

    const create = makeCreatePurchaseOrder()

    const createPurchaseOrder = await create(data)

    return res.status(201).json(createPurchaseOrder)
  }

  findById = async (req: Request, res: Response) => {
    const { id } = req.params

    const findId = makeFindById()

    const purchaseOrder = await findId(id)

    return res.status(200).json(purchaseOrder)
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

    const updatedPurchaseOrders = await pay(id)

    return res.status(200).json(updatedPurchaseOrders)
  }

  send = async (req: Request, res: Response) => {
    const { id } = req.params

    const send = makeSendPurchaseOrder()

    const updatedPurchaseOrders = await send(id, req.body)

    return res.status(200).json(updatedPurchaseOrders)
  }

  delivered = async (req: Request, res: Response) => {
    const { id } = req.params

    const delivered = makeDeliveredPurchaseOrder()

    const updatedPurchaseOrders = await delivered(id)

    return res.status(200).json(updatedPurchaseOrders)
  }

  failure = async (req: Request, res: Response) => {
    const { id } = req.params

    const failure = makeFailurePurchaseOrder()

    const updatedPurchaseOrders = await failure(id)

    return res.status(200).json(updatedPurchaseOrders)
  }
}
