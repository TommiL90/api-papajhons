import {
  CreateProductSchema,
  ProducstSearchParamsSchema,
  ProductSchema,
  UpdateProductSchema,
} from '@/schemas/product-schema'
import { z } from 'zod'

export type Product = z.infer<typeof ProductSchema>
export type CreateProduct = z.infer<typeof CreateProductSchema>
export type UpdateProduct = z.infer<typeof UpdateProductSchema>
export type SearchProductsParams = z.infer<typeof ProducstSearchParamsSchema>
export type FetchProducts = {
  nextPage: string | null
  prevPage: string | null
  pages: number
  items: number
  data: Product[] | []
}
