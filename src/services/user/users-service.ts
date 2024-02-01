import { AppError } from '@/errors/AppError'
import { TCreateUser, TResCreateUser } from '@/interfaces/user.interfaces'
import { UsersRepository } from '@/repositories/users-repository'
import { resCreateUserSchema } from '@/schemas/users-schema'
import { compare, hashSync } from 'bcryptjs'

export class UserService {
  constructor(private userRepository: UsersRepository) {}

  hashPassword = async (password: string): Promise<string> => {
    return hashSync(password, 10)
  }

  create = async (payload: TCreateUser): Promise<TResCreateUser> => {
    const email = await this.userRepository.findByEmail(payload.email)

    if (email) {
      throw new AppError('Email already exists', 409)
    }

    const hashedPassword = await this.hashPassword(payload.email)

    const data = await this.userRepository.create({
      ...payload,
      password: hashedPassword,
    })

    const newUser = resCreateUserSchema.parse(data)

    return newUser
  }
}

// const createUserService = async (
//   payload: TCreateUser,
// ): Promise<TResCreateUser> => {
//   const email = await prisma.user.findUnique({
//     where: {
//       email: payload.email,
//     },
//   })

//   if (email) {
//     throw new AppError('Email already in use', 409)
//   }

//   const hashedPassword = hashSync(payload.password, 10)

//   const prismaUserRepository = new PrismaUserRepository()

//   const data = await prismaUserRepository.create({
//     ...payload,
//     password: hashedPassword,
//   })

//   const newUser = resCreateUserSchema.parse(data)

//   return newUser
// }

// const loginUserService = async (payload: TLogin): Promise<string> => {
//   const user = await prisma.user.findFirst({
//     where: {
//       email: payload.email,
//     },
//   })

//   if (!user) {
//     throw new AppError('Invalid credentials', 401)
//   }

//   const pwdMatch: boolean = await compare(payload.password, user.password)

//   if (!pwdMatch) {
//     throw new AppError('Invalid credentials', 401)
//   }

//   const token: string = sign(
//     { randomKey: 'randomValue' },
//     String(process.env.SECRET_KEY),
//     { expiresIn: '48h', subject: String(user.id) },
//   )

//   return token
// }

// const updateUserService = async (
//   payload: Partial<TCreateUser>,
//   id: number,
// ): Promise<TResCreateUser> => {
//   const user = await prisma.user.findFirst({
//     where: {
//       id,
//     },
//   })

//   if (user?.name === payload.name) {
//     delete payload.name
//   }

//   const updatedUser = await prisma.user.update({
//     where: {
//       id,
//     },
//     data: { ...user, ...payload },
//   })

//   return resCreateUserSchema.parse(updatedUser)
// }

// const deleteUserService = async (idUser: number): Promise<void> => {
//   await prisma.user.update({
//     where: {
//       id: idUser,
//     },
//     data: {
//       deletedAt: new Date(),
//     },
//   })
// }

// const getActiveUsers = async (): Promise<TUsersList> => {
//   const activeUsers = await prisma.user.findMany({
//     where: {
//       deletedAt: null,
//     },
//   })
//   return usersListSchema.parse(activeUsers)
// }

// const getOwnerUserService = async (idUser: number): Promise<TResCreateUser> => {
//   const user: User | null = await prisma.user.findFirst({
//     where: {
//       id: idUser,
//     },
//   })

//   if (!user) {
//     throw new AppError('User not found', 404)
//   }

//   return resCreateUserSchema.parse(user)
// }

// export default {
//   createUserService,
//   loginUserService,
//   updateUserService,
//   deleteUserService,
//   getActiveUsers,
//   getOwnerUserService,
// }
