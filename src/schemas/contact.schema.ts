import { z } from "zod";


export const phoneSchema = z.object({
  id: z.number().int(),
  phone: z.string().length(10),
});

export const contactSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    phones: phoneSchema.array(),
    registrationDate: z.date(),
    userId: z.number(),
  });


export const reqCreateContactSchema = contactSchema.omit({
    id: true,
    registrationDate: true,
    userId: true,
    phones: true,
}).extend({
  phones: z.string().length(10).array(),
})

export const updateContactSchema = reqCreateContactSchema.partial()
