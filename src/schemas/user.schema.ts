import { z } from "zod";
import { contactSchema } from "./contact.schema";

export const userSchema = z.object({
    id: z.number().positive().int(),
    name: z.string().max(45),
    email: z.string().email().max(100),
    password: z.string().max(120),
    createdAt: z.string().or(z.date()).transform((val) => new Date(val)),
    updatedAt: z.string().or(z.date()).transform((val) => new Date(val)).nullish(),
    deletedAt: z.string().or(z.date()).transform((val) => (val ? new Date(val) : null)).nullish(),
    contacts:  z.array(contactSchema).nullish(),
  });

export const createUserSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    contacts: true,
})

export const resCreateUserSchema = userSchema.omit({
    password: true
})

export const loginSchema = userSchema.pick({
    email: true,
    password: true,
})

export const updateUserSchema = createUserSchema.partial()

export const usersListSchema = resCreateUserSchema.array()