import {
  CreateUser,
  FetchUsers,
  UpdateUser,
  UserWithoutPassword,
} from '@/interfaces/users-interfaces-schema'
import { User } from '@prisma/client'

export abstract class UsersRepository {
  abstract create(data: CreateUser): Promise<UserWithoutPassword>

  abstract findByEmail(email: string): Promise<UserWithoutPassword | null>

  abstract findByEmailForAuth(email: string): Promise<User | null>

  abstract findById(id: string): Promise<UserWithoutPassword | null>

  abstract findAll(skip: number, take: number): Promise<FetchUsers>

  abstract update(id: string, data: UpdateUser): Promise<UserWithoutPassword>

  abstract delete(id: string): Promise<void>
}
