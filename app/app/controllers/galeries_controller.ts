import Url from '#models/url'
import { deleteImage } from '#services/delete_image'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class GaleriesController {
  async show({ inertia, params, request }: HttpContext) {
    const galeries = await db
      .from('photos')
      .as('photos')
      .join('urls', (q) => {
        q.on('photos.groupe', 'urls.groupe')
      })
      .where('urls.id', params.id)
      .select('photos.url')
      .select('photos.like')
      .select('photos.comment')
      .select('photos.id')

    const urlData = await Url.query()
      .where('id', params.id)
      .select('end_selected', 'done', 'name', 'created_at', 'id')

    const imageId =
      typeof Number.parseInt(request.qs().id) === 'number'
        ? Number.parseInt(request.qs().id)
        : undefined

    return inertia.render('galery', { images: galeries, urlData: urlData[0], imageId })
  }

  async deleteImage({ session, response, params }: HttpContext) {
    const { error } = await deleteImage(params.id)
    if (error) {
      session.flash({ error })
      return response.badRequest()
    }
    return response.redirect().back()
  }
}
