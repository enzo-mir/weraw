import Photo from '#models/photo'
import Url from '#models/url'
import { groupedGaleriesByName } from '#services/get_galery_dashboard'
import { jwtMaker } from '#services/jwt_service'
import { storeImages } from '#services/store_images'
import type { HttpContext } from '@adonisjs/core/http'
import { randomUUID } from 'node:crypto'
export default class DashboardController {
  public async index({ inertia, auth }: HttpContext) {
    const galeries = await groupedGaleriesByName()

    const email = auth.user?.email

    return inertia.render('admin/dashboard', { galeries, user: { email } })
  }

  public async store({ request, response, session }: HttpContext) {
    const [name, date, files] = [
      request.input('name'),
      request.input('date'),
      request.files('files'),
    ]

    try {
      const images = await storeImages(name, files, false)
      const groupe = randomUUID()
      const jwt = await jwtMaker(groupe)
      const url = await Url.create({ name, createdAt: date, groupe, jwt: jwt as string })

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
