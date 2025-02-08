import Galery from '#models/galery'
import { getClientImages } from '#services/get_images'
import { jwtVerifier } from '#services/jwt_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class GaleryClientController {
  async show({ inertia, params }: HttpContext) {
    const jwt = params.jwt
    const verifier = await jwtVerifier(jwt)

    const urlData = await Galery.query()
      .where('groupe', verifier.groupe)
      .select('end_selected', 'url', 'name', 'created_at', 'id')
      .first()
    const images = await getClientImages({ groupe: verifier.groupe })
    const exp = new Date(verifier.exp * 1000)
    return inertia.render('client/galery', {
      images,
      urlData,
      exp,
    })
  }
}
