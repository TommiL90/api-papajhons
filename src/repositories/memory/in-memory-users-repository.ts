import {
  TCreateUser,
  TResCreateUser,
  TUser,
} from '@/interfaces/users-interfaces-schema'
import { UsersRepository } from '../users-repository'
import { Role } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: TUser[] = []

  create(data: TCreateUser): Promise<TResCreateUser> {
    const newUser = {
      id: randomUUID().toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      role: Role.MEMBER,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    }

    this.items.push(newUser)
    return Promise.resolve(newUser) as Promise<TResCreateUser>
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmailForAuth(email: string): Promise<TUser | null> {
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
