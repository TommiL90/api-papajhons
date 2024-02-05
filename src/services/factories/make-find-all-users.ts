import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { UserService } from '../users-service'

export const makeFindAllUsers = () => {
  const userRepository = new PrismaUserRepository()

  const userService = new UserService(userRepository)

  return userService.findAll
}
