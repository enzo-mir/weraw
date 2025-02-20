import { MultipartFile } from '@adonisjs/core/bodyparser'
import { z } from 'zod'

export const deleteImageSchema = z.array(z.string())

export const commentImage = z.object({
  imageId: z.string().transform((v) => Number.parseInt(v.trim())),
  comment: z.union([
    z
      .string()
      .transform((v) => v.trim())
      .optional(),
    z.null(),
  ]),
})

export const endSelection = z.object({
  urlId: z.string().transform((v) => Number.parseInt(v.trim())),
  end_selected: z.boolean(),
})

export const addImageSchema = z.object({
  files: z.union([z.array(z.instanceof(MultipartFile)), z.instanceof(MultipartFile)]),
  galeryName: z.string().transform((v) => v.trim()),
})
