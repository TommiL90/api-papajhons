import { z } from 'zod'

export const ProductsOrderSchema = z.object({
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
