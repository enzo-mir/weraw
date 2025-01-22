import { MultipartFile } from '@adonisjs/core/bodyparser'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'

export const storeImages = (
  name: string,
  images: MultipartFile[],
  updating: boolean
): Promise<
  Array<{
    url: string
  }>
> => {
  const folderPath = app.publicPath(`images/${name.replaceAll(' ', '_')}`)
  const files = Array.isArray(images) ? images : [images]

  if (!updating && fs.existsSync(folderPath)) {
    throw new Error('Une galerie existe déjà avec ce nom')
  } else {
    const uploadPromises = files.map((image) => {
      return new Promise((resolve, reject) => {
        const fileName = `${Date.now()}-${image.clientName}`.replaceAll(' ', '_')
        image
          .move(folderPath, {
            name: fileName,
          })
          .then(() => {
            resolve({
              url: `/images/${name.replaceAll(' ', '_')}/${fileName}`,
            })
          })
          .catch(() => {
            throw new Error('Erreur lors du déplacement du fichier')
          })
      })
    })

    return Promise.all(uploadPromises) as unknown as Promise<
      Array<{
        url: string
      }>
    >
  }
}
