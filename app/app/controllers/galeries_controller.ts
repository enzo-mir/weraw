import Photo from '#models/photo'
import type { HttpContext } from '@adonisjs/core/http'

export default class GaleriesController {
  async show({ inertia, params }: HttpContext) {
    const galeries = await Photo.query()
      .join('urls', 'photos.groupe', 'urls.groupe')
      .where('urls.id', params.id)
      .select('photos.url', 'urls.name')
    return inertia.render('galery', { images: galeries })
  }
}
