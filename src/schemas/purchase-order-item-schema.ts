import { z } from 'zod'

export const PurchaseOrderItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  orderId: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  updatedAt: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
})

export const CreatePurchaseOrderItemSchema = PurchaseOrderItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
