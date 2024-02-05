import {
  CreatePurchaseOrders,
  PurchaseOrders,
  UpdatePurchaseOrder,
} from '@/interfaces/purchase-order-interfaces'
import { OrdersStatus } from '@prisma/client'

export abstract class PurchaseOrdersRepository {
  abstract create(order: CreatePurchaseOrders): Promise<PurchaseOrders>

  abstract findAll(): Promise<PurchaseOrders[]>

  abstract findAllByUserId(userId: string): Promise<PurchaseOrders[]>

  abstract findCreatedStatusByUserId(
    userId: string,
    ordersStatus: OrdersStatus,
  ): Promise<PurchaseOrders | null>

  abstract findById(id: string): Promise<PurchaseOrders | null>

  abstract updateStatus(
    id: string,
    PurchaseOrder: UpdatePurchaseOrder,
  ): Promise<PurchaseOrders>
}
