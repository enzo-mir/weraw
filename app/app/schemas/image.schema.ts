import { MultipartFile } from '@adonisjs/core/bodyparser'
import { z } from 'zod'

export const deleteImageSchema = z.string().transform((val) => val.trim().replaceAll(' ', ''))

export const commentImage = z.object({
  imageId: z.string().transform((v) => Number.parseInt(v.trim())),
  comment: z
    .string()
    .transform((v) => v.trim())
    .optional(),
})

export const endSelection = z.object({
  urlId: z.string().transform((v) => Number.parseInt(v.trim())),
  endSelected: z.string().transform((v) => Boolean(v.trim())),
})

export const addImageSchema = z.object({
  files: z.union([z.array(z.instanceof(MultipartFile)), z.instanceof(MultipartFile)]),
  galeryName: z.string().transform((v) => v.trim()),
})
