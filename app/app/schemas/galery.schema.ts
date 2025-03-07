import { MultipartFile } from '@adonisjs/core/bodyparser'
import { DateTime } from 'luxon'
import { z } from 'zod'

export const addGalery = z.object({
  name: z
    .string({
      message: 'Veuillez entrez un nom de galery',
    })
    .transform((v) => v.trim()),
  date: z.string().transform((v, ctx) => {
    if (DateTime.fromISO(v.trim()).isValid) {
      return DateTime.fromISO(v.trim())
    } else {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La date n'est pas valide",
      })
      return z.NEVER
    }
  }),
  files: z.union([z.array(z.instanceof(MultipartFile)), z.instanceof(MultipartFile)], {
    message: 'Veuillez ajouter des images',
  }),
})

export const editGalery = z.object({
  name: z.string(),
  exp: z.union([z.string(), z.null()]),
  date: z.string().transform((v) => DateTime.fromISO(v.trim())),
  id: z.string().transform((v) => Number.parseInt(v.trim())),
})
