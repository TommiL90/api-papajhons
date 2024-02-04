import {
  CreatePurchaseOrderItem,
  PurchaseOrderItem,
} from '@/interfaces/purchase-order-item-interfaces'
import { PurchaseOrderItemRepository } from '@/repositories/purchase-order-item'

export class PurchaseOrderItemService {
  constructor(
    private purchaseOrderItemRepository: PurchaseOrderItemRepository,
  ) {}

  async create(
    createPurchaseOrderItem: CreatePurchaseOrderItem,
  ): Promise<PurchaseOrderItem> {
    const newOrderProduct = await this.purchaseOrderItemRepository.create(
      createPurchaseOrderItem,
    )

    return newOrderProduct
  }

  async findAll(): Promise<PurchaseOrderItem[] | []> {
    return await this.purchaseOrderItemRepository.findAll()
  }

  async findOne(id: string): Promise<PurchaseOrderItem> {
    const orderProduct = await this.purchaseOrderItemRepository.findOne(id)
    return orderProduct
  }
}
