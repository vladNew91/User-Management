import { z } from "zod"

export const editUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(64, "Name must be at most 64 characters"),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(64, "Username must be at most 64 characters"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(2, "City must be at least 2 characters").max(64, "City must be at most 64 characters"),
  phone: z.string().regex(/^\d+$/, "Phone must contain only digits"),
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(64, "Company name must be at most 64 characters"),
})

export type EditUserFormData = z.infer<typeof editUserSchema>
