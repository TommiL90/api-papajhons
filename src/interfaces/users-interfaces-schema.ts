import {
  AuthSchema,
  CreateUserSchema,
  ResCreateUserSchema,
  UpdateUserSchema,
  UserSchema,
  UsersListSchema,
} from '@/schemas/user-schema'
import { z } from 'zod'

export type User = z.infer<typeof UserSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>
export type UpdateUser = z.infer<typeof UpdateUserSchema>
export type UserWithoutPassword = z.infer<typeof ResCreateUserSchema>
export type AuthUser = z.infer<typeof AuthSchema>
export type UsersList = z.infer<typeof UsersListSchema>
export type FetchUsers = {
  count: number
  data: UserWithoutPassword[] | []
}

export type PaginatedUsers = FetchUsers & {
  nextPage: string | null
  prevPage: string | null
  pages: number
}
