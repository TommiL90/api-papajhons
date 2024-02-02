import {
  CreateUser,
  User,
  UserWithoutPassword,
} from '@/interfaces/users-interfaces-schema'
import { UsersRepository } from '../user-repository'
import { Role } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: CreateUser) {
    const newUser = {
      id: randomUUID().toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      role: Role.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(newUser)
    return Promise.resolve(newUser) as Promise<UserWithoutPassword>
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmailForAuth(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
