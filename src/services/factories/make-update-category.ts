import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository'
import { CategoryService } from '../category-service'

export const makeUpdateCategory = () => {
  const categoryRepository = new PrismaCategoryRepository()

  const categoryService = new CategoryService(categoryRepository)

  return categoryService.update
}
