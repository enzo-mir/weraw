import { z } from 'zod'

export const formValuesSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string({ message: 'Mot de passe invalide' }),
})

export type FormValues = z.infer<typeof formValuesSchema>
