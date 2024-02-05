import { ProductsService } from '../product-service'
import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-product-repository'

export const makeDeleteProduct = () => {
  const productRepository = new PrismaProductsRepository()
  const categoryRepository = new PrismaCategoryRepository()

  const productService = new ProductsService(
    productRepository,
    categoryRepository,
  )

  return productService.delete
}
