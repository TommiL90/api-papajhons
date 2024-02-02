import {
  AuthSchema,
  CreateUserSchema,
  ResCreateUserSchema,
  UserSchema,
  UsersListSchema,
} from '@/schemas/user-schema'
import { z } from 'zod'

export type User = z.infer<typeof UserSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>
export type UserWithoutPassword = z.infer<typeof ResCreateUserSchema>
export type AuthUser = z.infer<typeof AuthSchema>
export type UsersList = z.infer<typeof UsersListSchema>
