import { z } from "zod";
import { contactSchema, reqCreateContactSchema } from "../schemas/contact.schema";

export type TContact = z.infer<typeof contactSchema>
export type TCreateContact = z.infer<typeof reqCreateContactSchema>