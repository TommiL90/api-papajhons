import { CreatePurchaseOrderItem } from '@/interfaces/purchase-order-item-interfaces'
import { PurchaseOrderItemRepository } from '@/repositories/purchase-order-item-repository'
import { Prisma } from '@prisma/client'
import { AppError } from '@/errors/AppError'

export class PurchaseOrderItemService {
  constructor(
    private purchaseOrderItemRepository: PurchaseOrderItemRepository,
  ) {}

  createPurchaseOrderItems = async (
    createPurchaseOrderItems: CreatePurchaseOrderItem[],
  ): Promise<Prisma.BatchPayload> => {
    if (createPurchaseOrderItems.length === 0) {
      throw new AppError('No items to create')
    }

    return this.purchaseOrderItemRepository.createMany(createPurchaseOrderItems)
  }
}
