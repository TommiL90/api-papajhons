import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { TUser } from '@/interfaces/user.interfaces'

export class PrismaUserRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  }

  findByEmailForAuth(email: string): Promise<TUser | null> {
    throw new Error('Method not implemented.')
  }
}
