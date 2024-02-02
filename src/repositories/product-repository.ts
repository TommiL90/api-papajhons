import {
  CreateProduct,
  Product,
  UpdateProduct,
} from '@/interfaces/product-interfaces'

export abstract class ProductsRepository {
  abstract create(createProductDto: CreateProduct): Promise<Product>

  abstract findAll(): Promise<Product[]>

  abstract findOneBySku(sku: number): Promise<Product | null>

  abstract findOneById(id: string): Promise<Product | null>

  abstract update(id: string, updateProductDto: UpdateProduct): Promise<Product>

  abstract delete(id: string): Promise<void>
}
