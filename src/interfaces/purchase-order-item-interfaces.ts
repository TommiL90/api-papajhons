import {
  CreatePurchaseOrderItemSchema,
  PurchaseOrderItemSchema,
} from '@/schemas/purchase-order-item-schema'
import { z } from 'zod'

export type PurchaseOrderItem = z.infer<typeof PurchaseOrderItemSchema>

export type CreatePurchaseOrderItem = z.infer<
  typeof CreatePurchaseOrderItemSchema
>

export type UpdatePurchaseOrderItem = Partial<CreatePurchaseOrderItem>
