import { TCreateUser, TResCreateUser } from '@/interfaces/user.interfaces'

export interface UserRepository {
  create(data: TCreateUser): Promise<TResCreateUser>

  findByEmail(email: string): Promise<TResCreateUser | null>
}
