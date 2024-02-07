import { CreatePurchaseOrderItem } from '@/interfaces/purchase-order-item-interfaces'
import { Prisma } from '@prisma/client'

export abstract class PurchaseOrderItemRepository {
  abstract createMany(
    createPurchaseOrderItem: CreatePurchaseOrderItem[],
  ): Promise<Prisma.BatchPayload>
}
