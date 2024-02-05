import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { PurchaseOrdersService } from '../purchase-orders-service'
import { PrismaPurchaseOrdersRepository } from '@/repositories/prisma/prisma-purchase-order-repository'
import { PrismaPurchaseOrderItemRepository } from '@/repositories/prisma/prisma-purchase-order-item'

export const makeFindAllByUserId = () => {
  const purchaseOrderRepository = new PrismaPurchaseOrdersRepository()
  const purchaseOrderItemRepository = new PrismaPurchaseOrderItemRepository()
  const userRepository = new PrismaUserRepository()

  const purchaseService = new PurchaseOrdersService(
    purchaseOrderRepository,
    purchaseOrderItemRepository,
    userRepository,
  )

  return purchaseService.findAllByUserId
}
