import {
  TCreateUser,
  TResCreateUser,
  TUser,
} from '@/interfaces/users-interfaces-schema'

export interface UsersRepository {
  create(data: TCreateUser): Promise<TResCreateUser>

  findByEmail(email: string): Promise<TResCreateUser | null>

  findByEmailForAuth(email: string): Promise<TUser | null>

  findById(id: string): Promise<TResCreateUser | null>
}
