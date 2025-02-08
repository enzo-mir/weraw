import Galery from '#models/galery'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'

export const deleteGaleryService = async (id: number) => {
  const url = await Galery.find(id)
  if (!url) return { error: 'Une erreur est survenue lors de la suppression de la galerie' }

  fs.rmSync(app.publicPath('/images/' + url.name), { recursive: true })

  await url.delete()

  return { success: 'La galerie a bien été supprimée' }
}
