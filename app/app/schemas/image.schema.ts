import { z } from 'zod'

export const deleteImageSchema = z.string().transform((val) => val.trim().replaceAll(' ', ''))
