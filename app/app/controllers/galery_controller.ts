import Url from '#models/url'
import { deleteGaleryService } from '#services/delete_galery'
import { getAdminImages } from '#services/get_images'
import { jwtMaker, jwtVerifier } from '#services/jwt_service'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import fs from 'node:fs'
import { imageStoreSchema } from '#schemas/store_image.store'
import { storeImages } from '#services/store_images'
import { randomUUID } from 'node:crypto'

export default class GaleriesController {
  async show(ctx: HttpContext) {
    try {
      const urlData = await Url.query()
        .where('id', ctx.params.id)
        .select('end_selected', 'done', 'name', 'created_at', 'id', 'groupe', 'jwt')
        .first()
      const token = await jwtVerifier(urlData!.jwt)
        .then((e) => e.exp)
        .catch((e) => new Date(e.expiredAt).getTime() / 1000)

      const images = await getAdminImages(ctx.params as { id: string })

      return ctx.inertia.render('admin/galery', {
        images: ctx.inertia.defer(() => images),
        urlData: ctx.inertia.defer(() => urlData),
        exp: ctx.inertia.defer(() => token),
      })
    } catch (error) {
      return ctx.inertia.render('errors/not_found')
    }
  }

  public async create({ request, response, session }: HttpContext) {
    const [name, date, files] = [
      request.input('name'),
      request.input('date'),
      request.files('files'),
    ]

    try {
      await imageStoreSchema.parseAsync({ name, date, files })

      const groupe = randomUUID()
      const jwt = await jwtMaker(groupe)

      await Url.create({ name, createdAt: date, groupe, jwt: jwt as string })

      await storeImages(name, files, false, groupe)
      return response.redirect().back()
    } catch (error) {
      session.flash({ errors: { message: error.message } })
      return response.redirect().back()
    }
  }

  async delete(ctx: HttpContext) {
    const { id } = ctx.params

    const { error } = await deleteGaleryService(id)

    if (error) ctx.response.notFound()
    return ctx.response.redirect().toPath('/dashboard')
  }

  async edit({ request, response, params }: HttpContext) {
    const { id } = params
    const { name, date, exp } = request.all()
    const urlFind = await Url.find(id)
    if (!urlFind) return response.notFound()

    const token = exp ? await jwtMaker(urlFind.groupe, exp) : undefined

    if (typeof token !== 'string') return response.badRequest()

    const query = `
       UPDATE photos
       SET url = REPLACE(url, '${urlFind.name}', '${name}')
       WHERE groupe = '${urlFind.groupe}';
    `
    db.rawQuery(query).catch(() => {
      return response.badRequest()
    })

    fs.rename(
      app.publicPath(`/images/${urlFind.name}`),
      app.publicPath(`/images/${name}`),
      (err) => {
        if (err) response.badRequest()
      }
    )

    await Url.updateOrCreate({ id }, { name, updatedAt: date, createdAt: date, jwt: token })

    return response.redirect().back()
  }
}
