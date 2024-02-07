import prisma from '@/lib/prisma'
import { UsersRepository } from '../user-repository'
import {
  CreateUser,
  FetchUsers,
  UpdateUser,
  UserWithoutPassword,
} from '@/interfaces/users-interfaces-schema'

export class PrismaUserRepository implements UsersRepository {
  async create(data: CreateUser) {
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

  async findAll(skip: number, take: number): Promise<FetchUsers> {
    const usersPromise = await prisma.user.findMany({
      skip,
      take,
    })

    const totalPromise = await prisma.user.count()

    const [users, total] = await Promise.all([usersPromise, totalPromise])

    return {
      count: total,
      data: users,
    }
  }

  async update(id: string, data: UpdateUser): Promise<UserWithoutPassword> {
    return await prisma.user.update({ where: { id }, data })
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } })
  }
}
