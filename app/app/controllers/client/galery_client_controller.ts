import Url from '#models/url'
import { getClientImages } from '#services/get_images'
import type { HttpContext } from '@adonisjs/core/http'

export default class GaleryClientController {
  async show({ inertia, params, auth }: HttpContext) {
    if (await auth.check()) auth.use('web').logout()

    const urlData = await Url.query()
      .where('groupe', params.groupe)
      .select('end_selected', 'done', 'name', 'created_at', 'id')
      .first()

    return inertia.render('client/galery', {
      images: await getClientImages(params as { groupe: string }),
      urlData: urlData,
    })
  }
}
