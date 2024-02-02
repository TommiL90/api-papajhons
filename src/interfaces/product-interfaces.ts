import {
  CreateProductSchema,
  ProductSchema,
  UpdateProductSchema,
} from '@/schemas/product-schema'
import { z } from 'zod'

export type Product = z.infer<typeof ProductSchema>
export type CreateProduct = z.infer<typeof CreateProductSchema>
export type UpdateProduct = z.infer<typeof UpdateProductSchema>
