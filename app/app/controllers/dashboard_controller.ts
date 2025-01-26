import Photo from '#models/photo'
import Url from '#models/url'
import { jwtMaker } from '#services/jwt_service'
import { storeImages } from '#services/store_images'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { randomUUID } from 'node:crypto'
export default class DashboardController {
  public async index({ inertia, auth }: HttpContext) {
    const galeries = await db
      .from('urls')
      .as('urls')
      .leftJoin('photos', (q) => {
        q.on('urls.groupe', '=', 'photos.groupe')
      })
      .select(
        'urls.id',
        'urls.name',
        'urls.created_at',
        'urls.done',
        'urls.end_selected',
        'photos.url'
      )

    const groupedGaleriesByName = galeries.reduce(
      (acc: { [key: string]: any }, { name, url, id, created_at, done, end_selected }) => {
        acc[name] = acc[name] || {
          id,
          name,
          created_at,
          done,
          end_selected,
          url: [],
        }
        url && acc[name].url.push(url)
        return acc
      },
      {}
    )

    const result = Object.values(groupedGaleriesByName)

    const email = auth.user?.email

    return inertia.render('admin/dashboard', { galeries: result, user: { email } })
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
