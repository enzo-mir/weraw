import Photo from '#models/photo'
import { deleteImageSchema } from '#schemas/image.schema'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'

export const deleteImage = async (urls: Array<string>) => {
  try {
    const urlParsed = await deleteImageSchema.parseAsync(urls)

    const promise = urlParsed.map(async (url) => {
      const image = await Photo.query().select().where('url', url).first()
      if (!image) return Promise.reject(`L'image n'existe pas`)
      const urlPath = app.publicPath(url)

      if (!fs.existsSync(urlPath)) {
        return Promise.reject(`L'image n'existe pas`)
      } else {
        fs.unlinkSync(urlPath)
        await image.delete()
        return Promise.resolve({ url, message: 'Image supprimée avec succès' })
      }
    })

    return await Promise.all(promise)
  } catch (e) {
    throw Error('Une erreur est survenue')
  }
}
