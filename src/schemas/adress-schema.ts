import { z } from 'zod'

export const AddressSchema = z.object({
  id: z.string(),
  zipCode: z.string(),
  state: z.string(),
  city: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().nullable(),
  createdAt: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  updatedAt: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),

  userId: z.string(),
})
