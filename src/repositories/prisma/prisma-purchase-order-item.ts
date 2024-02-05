import { PurchaseOrderItemRepository } from '../purchase-order-item-repository'
import { CreatePurchaseOrderItem } from '@/interfaces/purchase-order-item-interfaces'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaPurchaseOrderItemRepository
  implements PurchaseOrderItemRepository
{
  async create(createPurchaseOrderItem: CreatePurchaseOrderItem) {
    return await prisma.purchaseOrderItems.create({
      data: {
        productId: createPurchaseOrderItem.purchaseOrderId,
        purchaseOrderId: createPurchaseOrderItem.purchaseOrderId,
        price: new Prisma.Decimal(createPurchaseOrderItem.price.toString()),
        quantity: createPurchaseOrderItem.quantity,
      },
    })
  }
}
