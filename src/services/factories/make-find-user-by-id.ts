import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { UserService } from '../users-service'

export const makeFindUserById = () => {
  const userRepository = new PrismaUserRepository()

  const userService = new UserService(userRepository)

  return userService.findById
}
