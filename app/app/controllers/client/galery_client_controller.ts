import Galery from '#models/galery'
import { getClientImages } from '#services/get_images'
import type { HttpContext } from '@adonisjs/core/http'

export default class GaleryClientController {
  async show({ inertia, params, request }: HttpContext) {
    const qs: 'all' | 'liked' | 'comment' | null = request.qs().filter

    const jwt = params.jwt

    const galery = await Galery.query().where('jwt', jwt).firstOrFail()

    const urlData = await Galery.query()
      .where('groupe', galery.groupe)
      .select('end_selected', 'url', 'name', 'created_at', 'id')
      .first()
    const images = await getClientImages({ groupe: galery.groupe }, qs)
    const exp = new Date(galery.exp * 1000)
    return inertia.render('client/galery', {
      images,
      urlData,
      exp,
    })
  }
}
