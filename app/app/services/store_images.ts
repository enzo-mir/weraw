import { MultipartFile } from '@adonisjs/core/bodyparser'
import app from '@adonisjs/core/services/app'
import { randomBytes } from 'node:crypto'
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
  function generateUniqueFileName(originalName: string): string {
    const timestamp = new Date().getTime()
    const randomString = randomBytes(4).toString('hex')
    const sanitizedOriginalName = originalName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .substring(0, 50)

    return `${timestamp}-${randomString}-${sanitizedOriginalName}.webp`
  }

  const folderPath = app.publicPath(`images/${name.replaceAll(' ', '_')}`)

  const files = Array.isArray(images) ? images : [images]

  if (!updating && fs.existsSync(folderPath)) {
    throw new Error('Une galerie existe déjà avec ce nom')
  }

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }

  const uploadPromises = files.map((image) => {
    const fileName = generateUniqueFileName(image.clientName.replace(/\.[^/.]+$/, ''))
    return new Promise(async (resolve, reject) => {
      try {
        const bufferedImage = await sharp(image.tmpPath)
          .webp({
            quality: 70,
            effort: 4,
            lossless: false,
          })
          .resize(900, null, {
            withoutEnlargement: true,
            fit: 'cover',
          })
          .toBuffer()

        const filePath = `images/${name.replaceAll(' ', '_')}/${fileName}`
        const fullPath = app.publicPath(filePath)

        await sharp(bufferedImage).toFile(fullPath)

        resolve({
          url: `/${filePath}`,
        })
      } catch (error) {
        reject(error)
      }
    })
  })

  return Promise.all(uploadPromises) as Promise<
    Array<{
      url: string
    }>
  >
}
