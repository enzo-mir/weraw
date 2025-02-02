import Url from '#models/url'
import { imageStoreSchema } from '#schemas/store_image.store'
import { groupedGaleriesByName } from '#services/get_galery_dashboard'
import { jwtMaker } from '#services/jwt_service'

import { storeImages } from '#services/store_images'
import type { HttpContext } from '@adonisjs/core/http'
import { randomUUID } from 'node:crypto'
export default class DashboardController {
  public async index(ctx: HttpContext) {
    const galeries = await groupedGaleriesByName()

    const email = ctx.auth.user?.email

    return ctx.inertia.render('admin/dashboard', { galeries, user: { email } })
  }

  public async store({ request, response, session, inertia, params }: HttpContext) {
    const [name, date, files] = [
      request.input('name'),
      request.input('date'),
      request.files('files'),
    ]

    try {
      await imageStoreSchema.parseAsync({ name, date, files })

      const groupe = randomUUID()
      const jwt = await jwtMaker(groupe)
      const url = await Url.create({ name, createdAt: date, groupe, jwt: jwt as string })
      await storeImages(name, files, false, url.groupe)

      return response.redirect().back()
    } catch (error) {
      session.flash({ errors: { message: error.message } })
      return response.redirect().back()
    }
  }
}
