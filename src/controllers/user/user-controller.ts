import { Request, Response } from 'express'
import { makeCreateUser } from '@/services/factories/make-create-user'
import { makeAuthUserService } from '@/services/factories/make-auth-service'
import {
  CreateUser,
  UserWithoutPassword,
} from '@/interfaces/users-interfaces-schema'

export class UserController {
  createUser = async (req: Request, res: Response) => {
    const data: CreateUser = req.body

    const createUserService = makeCreateUser()

    const newUser: UserWithoutPassword = await createUserService(data)

    return res.status(201).json(newUser)
  }

  authUser = async (req: Request, res: Response) => {
    const authService = makeAuthUserService()
    console.log(req.body)
    const token: string = await authService(req.body)

    return res.status(200).json({ token })
  }
}

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
