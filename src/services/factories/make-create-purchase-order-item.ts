import { PrismaPurchaseOrderItemRepository } from '@/repositories/prisma/prisma-purchase-order-item'
import { PurchaseOrderItemService } from '../purchase-order-item-service'
import { PrismaPurchaseOrdersRepository } from '@/repositories/prisma/prisma-purchase-order-repository'
import { PurchaseOrdersService } from '../purchase-orders-service'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export const makeCreatePurchaseOrderItem = () => {
  const usersRepository = new PrismaUserRepository()
  const purchaseOrdersRepository = new PrismaPurchaseOrdersRepository()
  const purchaseOrdersService = new PurchaseOrdersService(
    purchaseOrdersRepository,
    usersRepository,
  )
  const purchaseOrderItemRepossitory = new PrismaPurchaseOrderItemRepository()
  const purchaseOrderItemService = new PurchaseOrderItemService(
    purchaseOrderItemRepossitory,
    purchaseOrdersService,
  )

  return purchaseOrderItemService.createPurchaseOrderItem
}
