import prisma from '@/lib/prisma'
import { UsersRepository } from '../user-repository'
import { CreateUser } from '@/interfaces/users-interfaces-schema'
import { $Enums } from '@prisma/client'

export class PrismaUserRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    console.log(user)
    return user
  }

  async findByEmailForAuth(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  }

  findAll(): Promise<
    {
      id: string
      username: string
      firstName: string
      lastName: string
      email: string
      password: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }[]
  > {
    throw new Error('Method not implemented.')
  }

  update(
    id: string,
    data: {
      username?: string | undefined
      firstName?: string | undefined
      lastName?: string | undefined
      email?: string | undefined
      password?: string | undefined
    },
  ): Promise<{
    id: string
    username: string
    firstName: string
    lastName: string
    email: string
    password: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
  }> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async create(data: CreateUser) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
