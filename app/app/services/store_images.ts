import { MultipartFile } from '@adonisjs/core/bodyparser'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'
import sharp from 'sharp'
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
            let url = `/images/${name.replaceAll(' ', '_')}/${fileName}`
            if (image.size > 1000000) {
              const newUrl = url.slice(0, url.lastIndexOf('.')) + '.jpeg'
              sharp(app.publicPath(url))
                .jpeg({ quality: 20 })
                .toFile(app.publicPath(newUrl))
                .then((e) => {
                  fs.unlink(app.publicPath(url), (err) => {
                    if (err) {
                      reject(err)
                    }

                    return resolve({
                      url: newUrl,
                    })
                  })
                })
            } else {
              return resolve({
                url,
              })
            }
          })
          .catch((e) => {
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
