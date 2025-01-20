import Photo from '#models/photo'
import Url from '#models/url'
import { storeImages } from '#services/store_images'
import type { HttpContext } from '@adonisjs/core/http'
import { randomUUID } from 'node:crypto'
import db from '@adonisjs/lucid/services/db'
export default class DashboardController {
  public async index({ inertia }: HttpContext) {
    const galeries = await db
      .from('urls')
      .as('urls')
      .join('photos', (q) => {
        q.on('urls.groupe', '=', 'photos.groupe')
      })
      .select('urls.name', 'urls.created_at', 'urls.done', 'urls.end_selected', 'photos.url')
    const groupedGaleriesByName = Object.values(
      galeries.reduce((acc, item) => {
        if (!acc[item.name]) {
          acc[item.name] = { ...item, url: [] } // Initialize with empty URL array
        }
        acc[item.name].url.push(item.url) // Add the URL to the array
        return acc
      }, {})
    )

    return inertia.render('dashboard', { galeries: groupedGaleriesByName })
  }

  public async store({ request, response, session }: HttpContext) {
    const [name, date, files] = [
      request.input('name'),
      request.input('date'),
      request.files('files'),
    ]

    try {
      const images = await storeImages(name, files)
      const url = await Url.create({ name, createdAt: date, groupe: randomUUID() })
      const photoPromises = images.map(
        async (image) =>
          await Photo.create({
            url: image.url,
            groupe: url.groupe,
          })
      )
      await Promise.all(photoPromises)
      return response.redirect().back()
    } catch (error) {
      session.flash({ errors: { message: error.message } })
      return response.redirect().back()
    }
  }
}
