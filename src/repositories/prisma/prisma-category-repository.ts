import { CategoryRepository } from '../category-repository'

export class PrismaCategoryRepository implements CategoryRepository {
  create(category: {
    name: string
  }): Promise<{ id: string; createdAt: Date; updatedAt: Date; name: string }> {
    throw new Error('Method not implemented.')
  }

  findAll(): Promise<
    { id: string; createdAt: Date; updatedAt: Date; name: string }[]
  > {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<{
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
  } | null> {
    throw new Error('Method not implemented.')
  }

  update(
    id: string,
    category: { name?: string | undefined },
  ): Promise<{ id: string; createdAt: Date; updatedAt: Date; name: string }> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
