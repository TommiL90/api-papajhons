import { z } from 'zod'
import { Role } from '@prisma/client'

export const RoleSchema = z.enum([Role.ADMIN, Role.USER]).default(Role.USER)
export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(50),
  email: z.string().email().max(100),
  password: z.string().max(120),
  role: RoleSchema,
  createdAt: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  updatedAt: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
})

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  contacts: true,
  role: true,
})

export const ResCreateUserSchema = UserSchema.omit({
  password: true,
})

export const AuthSchema = UserSchema.pick({
  email: true,
  password: true,
})

export const UpdateUserSchema = CreateUserSchema.partial()

export const UsersListSchema = ResCreateUserSchema.array()
