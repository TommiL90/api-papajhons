import { Request, Response } from 'express'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { TCreateUser, TResCreateUser } from '@/interfaces/user.interfaces'
import { UserService } from '@/services/user/users-service'

const createUser = async (req: Request, res: Response) => {
  const data: TCreateUser = req.body

  const userRepository = new PrismaUserRepository()

  const userService = new UserService(userRepository)

  const newUser: TResCreateUser = await userService.create(data)

  return res.status(201).json(newUser)
}

// const loginUser = async (req: Request, res: Response) => {
//   const token: string = await userServices.loginUserService(req.body)

//   return res.status(200).json({ token })
// }

// const listUsers = async (req: Request, res: Response) => {
//   const userList: TUsersList = await userServices.getActiveUsers()

//   return res.status(200).json(userList)
// }

// const rerieveUser = async (req: Request, res: Response) => {
//   const id = Number(res.locals.userId)

//   const user: Omit<TUser, 'password'> =
//     await userServices.getOwnerUserService(id)

//   return res.status(200).json(user)
// }

// const updateUser = async (request: Request, response: Response) => {
//   const id = Number(request.params.id)

//   const updatedUser = await userServices.updateUserService(request.body, id)

//   return response.status(200).json(updatedUser)
// }

// const deleteUser = async (request: Request, response: Response) => {
//   const id = Number(request.params.id)

//   await userServices.deleteUserService(id)

//   response.status(204).send()
// }

// export default {
//   createUser,
//   loginUser,
//   updateUser,
//   listUsers,
//   deleteUser,
//   rerieveUser,
// }
