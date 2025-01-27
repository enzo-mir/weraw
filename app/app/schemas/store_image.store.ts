import { MultipartFile } from '@adonisjs/core/bodyparser'
import { z } from 'zod'

export const imageStoreSchema = z.object({
  name: z.string(),
  date: z
    .string()
    .refine((date) => new Date(date).toString() !== 'Invalid Date', { message: 'date invalide' }),
  files: z.array(z.instanceof(MultipartFile)),
})
