import Photo from '#models/photo'
import { fileTypes } from '#schemas/file_extension'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import app from '@adonisjs/core/services/app'
import { randomUUID, UUID } from 'node:crypto'
import fs from 'node:fs/promises'
import sharp from 'sharp'

interface ImageMetadata {
  width: number
  height: number
}

class ImageProcessingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ImageProcessingError'
  }
}

export const storeImages = async (
  name: string,
  images: MultipartFile[] | MultipartFile,
  updating: boolean,
  groupe: UUID
): Promise<Photo[]> => {
  const JPEG_QUALITY = 90
  const MAX_WIDTH = 1200
  const BRIGHTNESS_THRESHOLD = 0.5
  const WATERMARK_PATHS = {
    light: 'watermark/watermark_80.png',
    dark: 'watermark/watermark.png',
  }

  const generateUniqueFileName = (): string => {
    return `${Date.now()}-${randomUUID()}.jpeg`
  }

  const sanitizePath = (path: string): string => {
    return path.replaceAll(' ', '_')
  }

  const getImageBrightness = async (imageBuffer: Buffer): Promise<number> => {
    try {
      const { channels } = await sharp(imageBuffer).stats()
      return (0.299 * channels[0].mean + 0.587 * channels[1].mean + 0.114 * channels[2].mean) / 255
    } catch (error) {
      throw new ImageProcessingError("Erreur lors de la modification de l'image")
    }
  }

  const getImageMetadata = async (buffer: Buffer): Promise<ImageMetadata> => {
    const metadata = await sharp(buffer).metadata()
    if (!metadata.width || !metadata.height) {
      throw new ImageProcessingError("Erreur lors de la modification de l'image")
    }
    return { width: metadata.width, height: metadata.height }
  }

  const processImage = async (imageBuffer: Buffer): Promise<Buffer> => {
    try {
      return sharp(imageBuffer)
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'cover',
        })
        .raw()
        .toBuffer()
    } catch (error) {
      throw new ImageProcessingError("Erreur lors de l'ajout des images")
    }
  }

  const applyWatermark = async (
    imageBuffer: Buffer,
    brightness: number,
    fullPath: string
  ): Promise<sharp.OutputInfo> => {
    try {
      const watermarkPath = app.publicPath(
        brightness > BRIGHTNESS_THRESHOLD ? WATERMARK_PATHS.light : WATERMARK_PATHS.dark
      )

      const { width, height } = await getImageMetadata(imageBuffer)
      const watermarkBuffer = await sharp(watermarkPath).resize(width, height).raw().toBuffer()

      return sharp(imageBuffer)
        .composite([
          {
            input: watermarkBuffer,
            gravity: 'center',
            blend: 'over',
          },
        ])
        .toFile(fullPath)
    } catch (error) {
      throw new ImageProcessingError("Errur lors de l'ajout des images")
    }
  }

  const folderPath = app.publicPath(`images/${sanitizePath(name)}`)

  if (!updating) {
    try {
      await fs.access(folderPath)
      throw new ImageProcessingError('Une galerie avec ce nom existe déjà')
    } catch (error) {
      if (error instanceof ImageProcessingError) throw error
      await fs.mkdir(folderPath, { recursive: true })
    }
  }

  const files = Array.isArray(images) ? images : [images]

  const processFile = files.map(
    async (image: MultipartFile): Promise<{ url: string; groupe: UUID }> => {
      if (!image.extname || !fileTypes.includes(image.extname.toUpperCase())) {
        throw new ImageProcessingError(`Type d'image non supporté: ${image.extname}`)
      }
      const fileName = generateUniqueFileName()
      const filePath = `images/${name.replaceAll(' ', '_')}/${fileName}`
      const fullPath = app.publicPath(filePath)

      try {
        const imageBuffer = await fs.readFile(image.tmpPath!)
        const processedImage = await processImage(imageBuffer)
        const brightness = await getImageBrightness(processedImage)

        await applyWatermark(processedImage, brightness, fullPath)

        return { url: `/${filePath}`, groupe }
      } catch (error) {
        if (error instanceof ImageProcessingError) throw error
        throw new ImageProcessingError("Erreur lors de l'ajout des images")
      }
    }
  )

  try {
    const p = await Promise.all(processFile)
    return await Photo.createMany(p)
  } catch (error) {
    if (error instanceof ImageProcessingError) throw error
    throw new ImageProcessingError("Ereur lors de l'ajout des images")
  }
}
