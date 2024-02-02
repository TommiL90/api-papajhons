import { test, expect, describe, it, beforeEach } from 'vitest'

import { InMemoryCategoryRepository } from '@/repositories/memory/in-memory-category-respository'
import {
  Category,
  CreateCategory,
  UpdateCategory,
} from '@/interfaces/category-interfaces'
import { AppError } from '@/errors/AppError'
import { InMemoryProductRepository } from '@/repositories/memory/in-memory-product-repository'
import { ProductsService } from './product-service'
import { CategoryService } from '../category/category-service'
import {
  CreateProduct,
  Product,
  UpdateProduct,
} from '@/interfaces/product-interfaces'

let productRepository: InMemoryProductRepository
let categoryRepository: InMemoryCategoryRepository
let categoryService: CategoryService
let productService: ProductsService

describe('Auth service', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    categoryRepository = new InMemoryCategoryRepository()
    categoryService = new CategoryService(categoryRepository)
    productService = new ProductsService(productRepository, categoryService)
  })

  it('should be able to register a producst', async () => {
    const createCategory: Category = await categoryService.create({
      name: 'category 1',
    })
    const createProduct: CreateProduct = {
      name: 'Product 1',
      brand: 'brand 1 ',
      description: 'Some description',
      categoryId: createCategory.id,
      imgUrl: null,
      price: 55.55,
      sku: 293839,
      stock: 23344,
    }
    const category: Product = await productService.create(createProduct)

    expect(category.id).toEqual(expect.any(String))
    expect(category).toBeDefined()
    expect(category.name).toBe('Product 1')
  })

  it('should not be able to register a producst with incorrect category ID', async () => {
    const createProduct: CreateProduct = {
      name: 'Product 1',
      brand: 'brand 1 ',
      description: 'Some description',
      categoryId: 'Incorrect category id',
      imgUrl: null,
      price: 55.55,
      sku: 293839,
      stock: 23344,
    }
    try {
      await productService.create(createProduct)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be able to get a product profile', async () => {
    const createCategory: Category = await categoryService.create({
      name: 'category 1',
    })
    const createProduct: CreateProduct = {
      name: 'Product 1',
      brand: 'brand 1 ',
      description: 'Some description',
      categoryId: createCategory.id,
      imgUrl: null,
      price: 55.55,
      sku: 293839,
      stock: 23344,
    }
    const category: Product = await productService.create(createProduct)

    const findProduct = await productService.findById(category.id)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(findProduct!.name).toEqual('Product 1')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(findProduct!.categoryId).toEqual(createCategory.id)
  })

  it('should not be able to get a product profile with invalid id', async () => {
    try {
      await productService.findById('invalidId')
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should return a list of categories when there are categories in the database', async () => {
    const createCategory: Category = await categoryService.create({
      name: 'category 1',
    })
    const products: CreateProduct[] = [
      {
        name: 'Product 1',
        brand: 'brand 1 ',
        description: 'Some description',
        categoryId: createCategory.id,
        imgUrl: null,
        price: 55.55,
        sku: 293839,
        stock: 23344,
      },
      {
        name: 'Product 2',
        brand: 'brand 2 ',
        description: 'Some description',
        categoryId: createCategory.id,
        imgUrl: null,
        price: 55.55,
        sku: 293839,
        stock: 23344,
      },
    ]

    await Promise.all(
      products.map(async (item) => await productService.create(item)),
    )

    const result = await productService.findAll()

    expect(result.length).toBe(2)
    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })

  it('should be able return an empty list when there are no categories in the database', async () => {
    const result = await productService.findAll()

    expect(result.length).toBe(0)
  })

  it('should be able update a product', async () => {
    const createdCategory = await categoryService.create({
      name: 'New Category',
    })

    const createProduct: CreateProduct = {
      name: 'Product 1',
      brand: 'brand 1 ',
      description: 'Some description',
      categoryId: createdCategory.id,
      imgUrl: null,
      price: 55.55,
      sku: 293839,
      stock: 23344,
    }

    const updateProduct: UpdateProduct = {
      name: 'new name',
    }

    const newProduct: Product = await productService.create(createProduct)

    const res = await productService.update(newProduct.id, updateProduct)

    expect(res.id).toEqual(newProduct.id)
    expect(res.name).toEqual('new name')
  })

  it('should not be able update a inexistent Product', async () => {
    const productId = 'invalidId'

    const updateCategory: UpdateCategory = {
      name: 'new name',
    }

    try {
      await productService.update(productId, updateCategory)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be able to delete a product', async () => {
    const createdCategory = await categoryService.create({
      name: 'New Category',
    })

    const createProduct: CreateProduct = {
      name: 'Product 1',
      brand: 'brand 1 ',
      description: 'Some description',
      categoryId: createdCategory.id,
      imgUrl: null,
      price: 55.55,
      sku: 293839,
      stock: 23344,
    }

    const newProduct: Product = await productService.create(createProduct)

    await productService.delete(newProduct.id)

    try {
      await categoryRepository.findById(newProduct.id)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should not be able to delete a inexistent category', async () => {
    const producId = 'invalidId'
    try {
      await productService.delete(producId)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
