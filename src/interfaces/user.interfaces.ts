import { z } from 'zod'
import {
  createUserSchema,
  loginSchema,
  resCreateUserSchema,
  userSchema,
  usersListSchema,
} from '../schemas/user.schema'

export type TUser = z.infer<typeof userSchema>
export type TCreateUser = z.infer<typeof createUserSchema>
export type TResCreateUser = z.infer<typeof resCreateUserSchema>
export type TLogin = z.infer<typeof loginSchema>
export type TUsersList = z.infer<typeof usersListSchema>
