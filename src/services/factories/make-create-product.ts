import { ProductsService } from '../product-service'
import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-product-repository'

export const makeCreateProduct = () => {
  const productsRepository = new PrismaProductsRepository()
  const categoryRepository = new PrismaCategoryRepository()

  const productsService = new ProductsService(
    productsRepository,
    categoryRepository,
  )

  return productsService.create
}
