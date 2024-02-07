import { CreatePurchaseOrderItem } from '@/interfaces/purchase-order-item-interfaces'
import { makeCreatePurchaseOrderItem } from '@/services/factories/make-create-purchase-order-item'
import { Request, Response } from 'express'

export class PurchaseOrderItemController {
  create = async (req: Request, res: Response) => {
    const data: CreatePurchaseOrderItem = req.body

    const create = makeCreatePurchaseOrderItem()

    const newPurchaseOrderItem = await create(data)

    return res.status(201).json(newPurchaseOrderItem)
  }
}
