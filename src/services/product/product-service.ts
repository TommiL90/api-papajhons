import { AppError } from '@/errors/AppError'
import {
  CreateProduct,
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

  async create(createProduct: CreateProduct) {
    await this.verifyCategory(createProduct.categoryId)

    const findProduct = await this.productsRepository.findOneBySku(
      createProduct.sku,
    )
    if (findProduct) {
      throw new AppError('Product already exists')
    }

    return this.productsRepository.create(createProduct)
  }

  findAll(params: SearchProductsParams) {
    return this.productsRepository.findAll(params)
  }

  findById(id: string) {
    const product = this.productsRepository.findOneById(id)
    if (!product) {
      throw new AppError('Product not found')
    }
    return product
  }

  update(id: string, updateProduct: UpdateProduct) {
    const product = this.productsRepository.update(id, updateProduct)
    if (!product) {
      throw new AppError('Product not found')
    }
    return product
  }

  delete(id: string) {
    const deletedProduct = this.productsRepository.delete(id)
    if (!deletedProduct) {
      throw new AppError('Product not found')
    }
    return deletedProduct
  }

  private async verifyCategory(categoryId: string) {
    const findCategory = await this.categoryRepository.findById(categoryId)
    if (!findCategory) {
      throw new AppError('Category not found')
    }
  }
}
