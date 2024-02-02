import {
  CreateUser,
  UserWithoutPassword,
} from '@/interfaces/users-interfaces-schema'
import { User } from '@prisma/client'

export interface UsersRepository {
  create(data: CreateUser): Promise<UserWithoutPassword>

  findByEmail(email: string): Promise<UserWithoutPassword | null>

  findByEmailForAuth(email: string): Promise<User | null>

  findById(id: string): Promise<UserWithoutPassword | null>
}
