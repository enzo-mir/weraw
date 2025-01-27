import Photo from '#models/photo'
import { deleteImageSchema } from '#schemas/image.schema'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'

export const deleteImage = async (id: string) => {
  try {
    await deleteImageSchema.parseAsync(id)
    const image = await Photo.query().select().where('id', id).firstOrFail()
    const url = app.publicPath(image.url)

    if (!fs.existsSync(url)) {
      return { error: "Une erreur est survenue lors de la suppression de l'image" }
    }
    fs.unlinkSync(url)
    await Photo.query().where('id', id).delete()
    return { success: "L'image a bien été supprimée" }
  } catch (error) {
    return { error: "Une erreur est survenue lors de la suppression de l'image" }
  }
}
