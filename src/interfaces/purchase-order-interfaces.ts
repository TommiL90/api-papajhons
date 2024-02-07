import {
  CreatePurchaseOrderWithItemsSchema,
  CreatePurchaseOrdersSchema,
  PurchaseOrdersSchema,
} from '@/schemas/purchase-orders-schema'
import { z } from 'zod'
import { Product } from './product-interfaces'
import { PurchaseOrderItem } from './purchase-order-item-interfaces'

export type PurchaseOrders = z.infer<typeof PurchaseOrdersSchema>

export type CreatePurchaseOrders = z.infer<typeof CreatePurchaseOrdersSchema>

export type UpdatePurchaseOrder = Omit<Partial<CreatePurchaseOrders>, 'userId'>

export type CreatePurchaseOrderWithItems = z.infer<
  typeof CreatePurchaseOrderWithItemsSchema
>

type PurchaseOrderItemWithProduct = PurchaseOrderItem & {
  product: Product
}

export type PurchaseOrderResponse = {
  id: string
  status: string
  paid: boolean
  createdAt: string
  updatedAt: string
  userId: string
  purchaseOrderItems: PurchaseOrderItemWithProduct[]
}
