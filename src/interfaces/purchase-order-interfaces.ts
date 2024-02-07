import {
  CreatePurchaseOrderWithItemsSchema,
  CreatePurchaseOrdersSchema,
  PurchaseOrdersSchema,
} from '@/schemas/purchase-orders-schema'
import { z } from 'zod'

export type PurchaseOrders = z.infer<typeof PurchaseOrdersSchema>

export type CreatePurchaseOrders = z.infer<typeof CreatePurchaseOrdersSchema>

export type UpdatePurchaseOrder = Omit<Partial<CreatePurchaseOrders>, 'userId'>

export type CreatePurchaseOrderWithItems = z.infer<
  typeof CreatePurchaseOrderWithItemsSchema
>
