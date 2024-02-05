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

  abstract findOneBySku(sku: number): Promise<Product | null>

  abstract findOneById(id: string): Promise<Product | null>

  abstract update(id: string, updateProductDto: UpdateProduct): Promise<Product>

  abstract delete(id: string): Promise<void>
}
