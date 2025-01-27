import { z } from 'zod'

export const authSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email invalide' })
    .transform((val) => val.trim().replaceAll(' ', '')),
  password: z.string().transform((val) => val.trim().replaceAll(' ', '')),
})
