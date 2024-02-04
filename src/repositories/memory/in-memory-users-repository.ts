import {
  CreateUser,
  UpdateUser,
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
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
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

  async findAll(): Promise<User[]> {
    return this.items
  }

  async update(id: string, data: UpdateUser): Promise<User> {
    const userIndex = this.items.findIndex((user) => user.id === id)

    const user = (this.items[userIndex] = {
      ...this.items[userIndex],

      username: data.username || this.items[userIndex].username,
      email: data.email || this.items[userIndex].email,
      password: data.password || this.items[userIndex].password,

      updatedAt: new Date(),
    })

    return user
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(userIndex, 1)
  }
}
