import Url from '#models/url'
import { getClientImages } from '#services/get_images'
import { jwtVerifier } from '#services/jwt_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class GaleryClientController {
  async show({ inertia, params }: HttpContext) {
    const jwt = params.jwt
    const verifier = await jwtVerifier(jwt)

    const urlData = await Url.query()
      .where('groupe', verifier)
      .select('end_selected', 'done', 'name', 'created_at', 'id', 'groupe')
      .first()

    return inertia.render('client/galery', {
      images: await getClientImages({ groupe: verifier as string }),
      urlData,
    })
  }
}
