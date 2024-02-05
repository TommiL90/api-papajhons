import { CreateCategory } from '@/interfaces/category-interfaces'
import { CategoryRepository } from '../category-repository'
import prisma from '@/lib/prisma'

export class PrismaCategoryRepository implements CategoryRepository {
  async create(data: CreateCategory) {
    const newCategory = await prisma.category.create({
      data,
    })

    return newCategory
  }

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
    })

    return category
  }

  async findAll() {
    return await prisma.category.findMany()
  }

  update(
    id: string,
    category: { name?: string | undefined },
  ){
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
