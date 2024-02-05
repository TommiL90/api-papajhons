import {
  CreateProduct,
  SearchProductsParams,
} from '@/interfaces/product-interfaces'
import { makeCreateProduct } from '@/services/product/factories/make-create-product'
import { makeDeleteProduct } from '@/services/product/factories/make-delete-product'
import { makeListProduct } from '@/services/product/factories/make-list-products'
import { makeRetrieveProduct } from '@/services/product/factories/make-retrieve-product'
import { makeUpdateProduct } from '@/services/product/factories/make-update-product'
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
    const body: SearchProductsParams = req.query

    const makeListProducts = makeListProduct()

    const products = await makeListProducts(body)

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
