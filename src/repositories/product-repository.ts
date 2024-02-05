import {
  CreateProduct,
  FetchProducts,
  Product,
  SearchProductsParams,
  UpdateProduct,
} from '@/interfaces/product-interfaces'

export abstract class ProductsRepository {
  abstract create(createProductDto: CreateProduct): Promise<Product>

  abstract findAll(params: SearchProductsParams): Promise<FetchProducts>

  abstract findBySku(sku: number): Promise<Product | null>

  abstract findById(id: string): Promise<Product | null>

  abstract update(id: string, updateProductDto: UpdateProduct): Promise<Product>

  abstract delete(id: string): Promise<void>
}
