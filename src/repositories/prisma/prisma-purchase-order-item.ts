import { PurchaseOrderItemRepository } from '../purchase-order-item-repository'
import { CreatePurchaseOrderItem } from '@/interfaces/purchase-order-item-interfaces'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaPurchaseOrderItemRepository
  implements PurchaseOrderItemRepository
{
  async createMany(createPurchaseOrderItems: CreatePurchaseOrderItem[]) {
    const formatedData = createPurchaseOrderItems.map((item) => ({
      ...item,
      price: new Prisma.Decimal(item.price),
    }))

    const data = await prisma.purchaseOrderItems.createMany({
      data: formatedData,
      skipDuplicates: true,
    })

    return data
  }
}
