import {
  CreatePurchaseOrders,
  PurchaseOrders,
  UpdatePurchaseOrder,
} from '@/interfaces/purchase-order-interfaces'

export abstract class PurchaseOrdersRepository {
  abstract create(order: CreatePurchaseOrders): Promise<PurchaseOrders>

  abstract findAll(): Promise<PurchaseOrders[]>

  abstract findById(id: string): Promise<PurchaseOrders | null>

  abstract update(
    id: string,
    PurchaseOrder: UpdatePurchaseOrder,
  ): Promise<PurchaseOrders>

  abstract delete(id: string): Promise<void>
}
