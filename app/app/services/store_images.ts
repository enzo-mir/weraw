import Photo from '#models/photo'
import { fileTypes } from '#schemas/file_extension'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import app from '@adonisjs/core/services/app'
import { randomBytes, UUID } from 'node:crypto'
import fs from 'node:fs/promises'
import sharp from 'sharp'

export const storeImages = async (
  name: string,
  images: MultipartFile[] | MultipartFile,
  updating: boolean,
  groupe: UUID
): Promise<unknown | Error> => {
  const generateUniqueFileName = (originalName: string): string => {
    const timestamp = Date.now()
    const randomString = randomBytes(4).toString('hex')
    const sanitizedOriginalName = originalName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .substring(0, 50)

    return `${timestamp}-${randomString}-${sanitizedOriginalName}.webp`
  }

  const getImageBrightness = async (imagePath: string): Promise<number> => {
    const { channels } = await sharp(imagePath).stats()
    return Math.round(
      0.299 * channels[0].mean + 0.587 * channels[1].mean + 0.114 * channels[2].mean
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

    const fileName = generateUniqueFileName(image.clientName.replace(/\.[^/.]+$/, ''))
    const filePath = `images/${name.replaceAll(' ', '_')}/${fileName}`
    const fullPath = app.publicPath(filePath)

    try {
      const resizedImage = await sharp(image.tmpPath)
        .webp({ quality: 90, lossless: true })
        .resize(1200, null, { withoutEnlargement: true, fit: 'cover' })
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

      await Photo.create({ url: `/${filePath}`, groupe })
    } catch (error) {
      throw new Error(`Failed to process image: ${error.message}`)
    }
  })

  return Promise.all(uploadPromises)
}
