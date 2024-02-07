import {
  CreateProduct,
  SearchProductsParams,
} from '@/interfaces/product-interfaces'
import { redis } from '@/lib/redis'
import { makeCreateProduct } from '@/services/factories/make-create-product'
import { makeDeleteProduct } from '@/services/factories/make-delete-product'
import { makeListProduct } from '@/services/factories/make-list-products'
import { makeRetrieveProduct } from '@/services/factories/make-retrieve-product'
import { makeUpdateProduct } from '@/services/factories/make-update-product'
import { Request, Response } from 'express'

export class ProductController {
  createProduct = async (req: Request, res: Response) => {
    const data: CreateProduct = req.body

    const createProduct = makeCreateProduct()

    const newProduct = await createProduct(data)

    return res.status(201).json(newProduct)
  }

  findById = async (req: Request, res: Response) => {
    const { id } = req.params

    const listProducts = makeRetrieveProduct()

    const products = await listProducts(id)

    return res.status(200).json(products)
  }

  findAll = async (req: Request, res: Response) => {
    const params: SearchProductsParams = req.query

    const baseUrl = `${req.protocol}://${req.get('host')}`

    const key = `${baseUrl}-${params.query ? params.query : ''}-${
      params.categoryId ? params.categoryId : ''
    }-${params.pageNumber ? params.pageNumber : ''}-${
      params.pageSize ? params.pageSize : ''
    }`

    const productsFromCache = await redis.get(key)

    if (productsFromCache) {
      return res.status(200).json(JSON.parse(productsFromCache))
    }

    const makeListProducts = makeListProduct()

    const products = await makeListProducts(params, baseUrl)

    await redis.set(key, JSON.stringify(products), 'EX', 600)

    return res.status(200).json(products)
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params

    const updateProduct = makeUpdateProduct()

    const updatedProduct = await updateProduct(id, req.body)

    return res.status(200).json(updatedProduct)
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const deleteProduct = makeDeleteProduct()

    await deleteProduct(id)

    return res.status(200).send()
  }
}
