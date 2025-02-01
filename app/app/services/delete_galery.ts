import Url from '#models/url'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'

export const deleteGaleryService = async (id: number) => {
  const url = await Url.find(id)
  if (!url) return { error: 'Une erreur est survenue lors de la suppression de la galerie' }

  fs.rmSync(app.publicPath('/images/' + url.name.replaceAll(' ', '_')), { recursive: true })

  await url.delete()

  return { success: 'La galerie a bien été supprimée' }
}
