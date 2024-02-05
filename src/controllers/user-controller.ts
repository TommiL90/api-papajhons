import { Request, Response } from 'express'
import { makeCreateUser } from '@/services/factories/make-create-user'
import { makeAuthUserService } from '@/services/factories/make-auth-service'
import {
  CreateUser,
  UserWithoutPassword,
} from '@/interfaces/users-interfaces-schema'
import { makeFindUserById } from '@/services/factories/make-find-user-by-id'
import { makeFindAllUsers } from '@/services/factories/make-find-all-users'
import { makeUpdateUser } from '@/services/factories/make-update-user'
import { makeDeleteUser } from '@/services/factories/make-delete-user'

export class UserController {
  createUser = async (req: Request, res: Response) => {
    const data: CreateUser = req.body

    const createUserService = makeCreateUser()

    const newUser: UserWithoutPassword = await createUserService(data)

    return res.status(201).json(newUser)
  }

  authUser = async (req: Request, res: Response) => {
    const authService = makeAuthUserService()

    const token: string = await authService(req.body)

    return res.status(200).json({ token })
  }

  findById = async (req: Request, res: Response) => {
    const { id } = req.params
    const foundUser = makeFindUserById()

    const user = await foundUser(id)

    return res.status(200).json(user)
  }

  findAll = async (req: Request, res: Response) => {
    const findAllUsers = makeFindAllUsers()

    const users = await findAllUsers()

    return res.status(200).json(users)
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params

    const updateUser = makeUpdateUser()

    const updatedUser = await updateUser(id, req.body)

    return res.status(200).json(updatedUser)
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const deleteUser = makeDeleteUser()

    await deleteUser(id)

    return res.status(204).send()
  }
}
