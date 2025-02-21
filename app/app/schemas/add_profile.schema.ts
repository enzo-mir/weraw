import { z } from 'zod'

export const addProfileSchema = z.object({
  name: z.string().nonempty({
    message: 'Le nom du profil ne peut pas être vide',
  }),
  color: z.string().nonempty({
    message: 'La couleur du profil ne peut pas être vide',
  }),
})
