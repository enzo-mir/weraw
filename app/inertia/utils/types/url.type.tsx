import { z } from 'zod'

export const urlSchema = z
  .string()
  .url({ message: 'Lien expiré ou invalide' })
  .startsWith('https://photos.weraw.fr/', { message: 'Lien expiré ou invalide' })
