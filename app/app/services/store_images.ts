import { MultipartFile } from '@adonisjs/core/bodyparser'
import app from '@adonisjs/core/services/app'

export const storeImages = (images: MultipartFile[]) => {
  const files = Array.isArray(images) ? images : [images]

  const uploadPromises = files.map((image) => {
    return new Promise((resolve, reject) => {
      const fileName = `${Date.now()}-${image.clientName}`.replaceAll(' ', '_')
      image
        .move(app.publicPath('images'), {
          name: fileName,
        })
        .then(() => {
          resolve({
            url: `/images/${fileName}`,
          })
        })
        .catch(() => {
          reject(`Erreur lors du déplacement du fichier`)
        })
    })
  })

  return Promise.allSettled(uploadPromises)
}
