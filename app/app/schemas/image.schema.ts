import { MultipartFile } from '@adonisjs/core/bodyparser'
import { z } from 'zod'

export const deleteImageSchema = z.array(z.string())

export const commentImage = z.object({
  id: z.number(),
  comment: z.union([
    z
      .string()
      .transform((v) => v.trim())
      .optional(),
    z.null(),
  ]),
})

export const addImageSchema = z.object({
  files: z.union([z.array(z.instanceof(MultipartFile)), z.instanceof(MultipartFile)]),
  galeryName: z.string().transform((v) => v.trim()),
})
