import { test, expect, describe, it, beforeEach } from 'vitest'

import { CategoryService } from './category-service'
import { InMemoryCategoryRepository } from '@/repositories/memory/in-memory-category-respository'
import {
  Category,
  CreateCategory,
  UpdateCategory,
} from '@/interfaces/category-interfaces'
import { AppError } from '@/errors/AppError'

let categoryRepository: InMemoryCategoryRepository
let categoryService: CategoryService
describe('Auth service', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository()
    categoryService = new CategoryService(categoryRepository)

    const newCategory = {
      name: 'New Category',
    }
  })

  it('should be able to register a category', async () => {
    const category: Category = await categoryService.create({
      name: 'New Category',
    })

    expect(category.id).toEqual(expect.any(String))
    expect(category).toBeDefined()
    expect(category.name).toBe('New Category')
  })

  it('should be able to get a category profile', async () => {
    const category = await categoryService.create({
      name: 'new Category',
    })

    const findedCategory = await categoryService.findById(category.id)

    expect(findedCategory!.name).toEqual('new Category')
    expect(findedCategory!.id).toEqual(category.id)
  })

  it('should not be able to get a category profile with invalid id', async () => {
    try {
      await categoryService.findById('invalidId')
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should throw a AppError when an invalid ID is provided', async () => {
    const serviceId = 'invalidId'

    try {
      await categoryService.findById(serviceId)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should return a list of categories when there are categories in the database', async () => {
    const categories = [{ name: 'Category 1' }, { name: 'Category 2' }]

    categories.forEach(async (item) => await categoryService.create(item))

    const result = await categoryService.findAll()

    expect(result.length).toBe(2)
    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })

  it('should be able return an empty list when there are no categories in the database', async () => {
    const result = await categoryService.findAll()

    expect(result.length).toBe(0)
  })

  it('should be able update a category', async () => {
    const createdCategory = await categoryService.create({
      name: 'New Category',
    })

    const categoryId = createdCategory.id
    const updateCategory: UpdateCategory = {
      name: 'new name',
    }

    const res = await categoryRepository.update(categoryId, updateCategory)

    expect(res.id).toEqual(categoryId)
    expect(res.name).toEqual('new name')
  })

  it('should not be able update a inexistent category', async () => {
    const categoryId = 'invalidId'

    const updateCategory: UpdateCategory = {
      name: 'new name',
    }

    try {
      await categoryRepository.update(categoryId, updateCategory)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be able to delete a category', async () => {
    const createdCategory = await categoryService.create({
      name: 'New Category',
    })

    const categoryId = createdCategory.id

    await categoryService.delete(categoryId)

    try {
      await categoryRepository.findById(categoryId)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should not be able to delete a inexistent category', async () => {
    const categoryId = 'invalidId'
    try {
      await categoryService.delete(categoryId)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
