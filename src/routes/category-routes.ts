import { CategoryController } from '@/controllers/category-controller'

import { Router } from 'express'

const categoryRouter: Router = Router()
const categoryController = new CategoryController()

categoryRouter.post('', categoryController.create)

categoryRouter.get('/:id', categoryController.findById)

categoryRouter.get('', categoryController.findAll)

categoryRouter.patch('/:id', categoryController.update)

categoryRouter.delete('/:id', categoryController.delete)

export default categoryRouter
