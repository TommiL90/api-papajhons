import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-product-repository'
import { ProductsService } from '@/services/product/product-service'
import { Request, Response } from 'express'

export class ProductController {
  // createProduct = async (req: Request, res: Response) => {
  //   const data: CreateProduct = req.body

  //   const userRepository = new PrismaP()

  //   const userService = new UserService(userRepository)
  //   const createUserService = makeCreateUser()

  //   const newUser: UserWithoutPassword = await createUserService(data)

  //   return res.status(201).json(newUser)
  // }

  FindAll = async (req: Request, res: Response) => {
    const body = req.query
    const productRepository = new PrismaProductsRepository()
    const categoryRepository = new PrismaCategoryRepository()

    const productService = new ProductsService(
      productRepository,
      categoryRepository,
    )

    const products = await productService.findAll(body)
    return res.status(200).json(products)
  }
}
