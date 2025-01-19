import Photo from '#models/photo'
import Url from '#models/url'
import { storeImages } from '#services/store_images'
import type { HttpContext } from '@adonisjs/core/http'
import { randomUUID } from 'node:crypto'

export default class DashboardController {
  public async index({ inertia }: HttpContext) {
    return inertia.render('dashboard')
  }

  public async store({ request, response }: HttpContext) {
    const [name, date, files] = [
      request.input('name'),
      request.input('date'),
      request.files('files'),
    ]

    try {
      const images = await storeImages(files)
      const url = await Url.create({ name, createdAt: date, groupe: randomUUID() })

      if (images[0].status === 'fulfilled') {
        await Photo.create({
          url: (images[0].value as { url: string }).url,
          groupe: url.groupe,
        })
      }
    } catch (error) {
      return response.status(409).json({ message: error.message })
    }
  }
}
