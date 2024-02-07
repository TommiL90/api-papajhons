import { Request, Response } from 'express'
import { makeCreateUser } from '@/services/factories/make-create-user'
import { makeAuthUserService } from '@/services/factories/make-auth-service'
import {
  CreateUser,
  PaginatedUsers,
  UserWithoutPassword,
} from '@/interfaces/users-interfaces-schema'
import { makeFindUserById } from '@/services/factories/make-find-user-by-id'
import { makeFindAllUsers } from '@/services/factories/make-find-all-users'
import { makeUpdateUser } from '@/services/factories/make-update-user'
import { makeDeleteUser } from '@/services/factories/make-delete-user'
import { redis } from '@/lib/redis'
import { z } from 'zod'

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
    const searchGymsQuerySchema = z.object({
      page: z.coerce.number().min(1).default(1),
      take: z.coerce.number().min(1).default(30),
    })
    const { page, take } = searchGymsQuerySchema.parse(req.query)
    const baseUrl = `${req.protocol}://${req.get('host')}`
    const key = `${baseUrl}-${page}`

    const userFromCache = await redis.get(key)

    if (userFromCache) {
      return res.status(200).json(JSON.parse(userFromCache))
    }

    const findAllUsers = makeFindAllUsers()

    const users: PaginatedUsers = await findAllUsers(page, take, baseUrl)

    await redis.set(key, JSON.stringify(users), 'EX', 600)

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
