import { z } from "zod";
import { contactSchema, reqCreateContactSchema, updateContactSchema } from "../schemas/contact.schema";

export type TContact = z.infer<typeof contactSchema>
export type TCreateContact = z.infer<typeof reqCreateContactSchema>

export type TUpdateContact = z.infer<typeof updateContactSchema>

