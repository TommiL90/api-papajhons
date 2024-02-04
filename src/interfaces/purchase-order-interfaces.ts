import {
  PurchaseOrdersCreateSchema,
  PurchaseOrdersSchema,
} from '@/schemas/purchase-orders-schema'
import { z } from 'zod'

export type PurchaseOrders = z.infer<typeof PurchaseOrdersSchema>

export type CreatePurchaseOrders = z.infer<typeof PurchaseOrdersCreateSchema>

export type UpdatePurchaseOrder = Partial<CreatePurchaseOrders>
