import { z } from 'zod'
export const editAdminSchema = z
  .object({
    email: z.string().email({ message: 'Ancien email invalide' }),
    newEmail: z.string().email({ message: 'Nouveau email invalide' }).optional(),
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password || data.password_confirmation) {
        return data.password === data.password_confirmation
      }
      return true
    },
    {
      message: 'Les mots de passe ne correspondent pas',
    }
  )
