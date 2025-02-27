import { fileTypes } from '#schemas/file_extension'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import app from '@adonisjs/core/services/app'
import { UUID } from 'node:crypto'
import fs from 'node:fs/promises'
import sharp from 'sharp'

export const storeImages = async (
  name: string,
  images: MultipartFile[] | MultipartFile,
  updating: boolean,
  groupe: UUID
): Promise<{ url: string; groupe: UUID }[]> => {
  const getImageBrightness = async (imagePath: string): Promise<number> => {
    const stats = await sharp(imagePath).stats()
    if (stats.channels.length < 3) {
      return Math.round(stats.channels[0].mean)
    }
    return Math.round(
      0.299 * stats.channels[0].mean +
        0.587 * stats.channels[1].mean +
        0.114 * stats.channels[2].mean
    )
  }

  const folderPath = app.publicPath(`images/${name.replaceAll(' ', '_')}`)

  const files = Array.isArray(images) ? images : [images]

  if (!updating) {
    try {
      await fs.access(folderPath)
      throw new Error('Une galerie existe déjà avec ce nom')
    } catch (error) {}
  }

  await fs.mkdir(folderPath, { recursive: true })

  const uploadPromises = files.map(async (image) => {
    if (!fileTypes.includes(image.extname!.toUpperCase())) {
      throw new Error('Type de fichier invalide')
    }

    const fileName = image.clientName.replace(/\.[^/.]+$/, '')
    const filePath = `images/${name.replaceAll(' ', '_')}/${fileName}`
    const fullPath = app.publicPath(filePath)

    try {
      const resizedImage = await sharp(image.tmpPath)
        .webp({ quality: 100 })
        .resize(1200, null, { withoutEnlargement: true, fit: 'cover' })
        .rotate()
        .toBuffer()

      const metadata = await sharp(resizedImage).metadata()
      const brightness = await getImageBrightness(image.tmpPath!)

      const watermarkPath = app.publicPath(
        brightness / 255 > 0.5 ? 'watermark/watermark_80.png' : 'watermark/watermark.png'
      )

      const watermarkBuffered = await sharp(watermarkPath)
        .resize(metadata.width, metadata.height)
        .toBuffer()

      await sharp(resizedImage)
        .composite([{ input: watermarkBuffered, gravity: 'center', blend: 'over' }])
        .toFile(fullPath)
        .catch(() => {
          throw new Error("Erreur lors de l'enregistrement de l'image")
        })
      return Promise.resolve({
        url: `/${filePath}`,
        groupe,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  })

  return await Promise.all(uploadPromises)
}
