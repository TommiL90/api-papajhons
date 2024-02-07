import { AppError } from '@/errors/AppError'
import {
  CreateProduct,
  PaginatedProducts,
  SearchProductsParams,
  UpdateProduct,
} from '@/interfaces/product-interfaces'
import { CategoryRepository } from '@/repositories/category-repository'
import { ProductsRepository } from '@/repositories/product-repository'

export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  create = async (createProduct: CreateProduct) => {
    await this.verifyCategory(createProduct.categoryId)

    const findProduct = await this.productsRepository.findBySku(
      createProduct.sku,
    )
    if (findProduct) {
      throw new AppError('Product already exists')
    }

    return this.productsRepository.create(createProduct)
  }

  findAll = async (
    params: SearchProductsParams,
    baseUrl: string,
  ): Promise<PaginatedProducts> => {
    const { categoryId, query, pageNumber, pageSize } = params
    const page = parseInt(pageNumber?.toString() || '1', 10)
    const take = parseInt(pageSize?.toString() || '20', 10)

    const { data, count: total } = await this.productsRepository.findAll({
      query,
      pageNumber: page,
      categoryId,
      pageSize: take,
    })

    const pages: number = Math.ceil(total / take)

    const prevPage: string | null =
      page === 1 ? null : `${baseUrl}?pageNumber=${page! - 1}&pageSize=${take}`
    const nextPage: string | null =
      page! + 1 > pages
        ? null
        : `${baseUrl}?pageNumber=${page! + 1}&pageSize=${take}`

    return {
      nextPage,
      prevPage,
      count: total,
      pages,
      data,
    }
  }

  findById = async (id: string) => {
    const product = this.productsRepository.findById(id)
    if (!product) {
      throw new AppError('Product not found')
    }
    return product
  }

  update = async (id: string, updateProduct: UpdateProduct) => {
    const product = this.productsRepository.update(id, updateProduct)
    if (!product) {
      throw new AppError('Product not found')
    }
    return product
  }

  delete = async (id: string) => {
    const deletedProduct = this.productsRepository.delete(id)
    if (!deletedProduct) {
      throw new AppError('Product not found')
    }
    return deletedProduct
  }

  private verifyCategory = async (categoryId: string) => {
    const findCategory = await this.categoryRepository.findById(categoryId)
    if (!findCategory) {
      throw new AppError('Category not found')
    }
  }
}
