import { PurchaseOrderItemRepository } from '../purchase-order-item-repository'
import { CreatePurchaseOrderItem } from '@/interfaces/purchase-order-item-interfaces'
import prisma from '@/lib/prisma'

export class PrismaPurchaseOrderItemRepository
  implements PurchaseOrderItemRepository
{
  async createMany(createPurchaseOrderItems: CreatePurchaseOrderItem[]) {
    const data = await prisma.purchaseOrderItems.createMany({
      data: createPurchaseOrderItems,
      skipDuplicates: true,
    })

    return data
  }
}
