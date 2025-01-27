import Url from '#models/url'
import { deleteGaleryService } from '#services/delete_galery'
import { getAdminImages } from '#services/get_images'
import { jwtMaker, jwtVerifier } from '#services/jwt_service'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import fs from 'node:fs'

export default class GaleriesController {
  async show({ inertia, params }: HttpContext) {
    const urlData = await Url.query()
      .where('id', params.id)
      .select('end_selected', 'done', 'name', 'created_at', 'id', 'groupe', 'jwt')
      .first()
    const jwt = await jwtVerifier(urlData!.jwt)

    const images = await getAdminImages(params as { id: string })
    return inertia.render('admin/galery', {
      images,
      urlData,
      exp: jwt.exp,
    })
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

    console.log(exp)

    const jwt = exp ? await jwtMaker(urlFind.groupe, exp) : undefined

    if (typeof jwt !== 'string') return response.badRequest()

    const query = `
       UPDATE photos
       SET url = REPLACE(url, '${urlFind.name}', '${name}')
       WHERE groupe = '${urlFind.groupe}';
    `
    db.rawQuery(query).catch((e) => {
      return response.badRequest()
    })

    fs.rename(
      app.publicPath(`/images/${urlFind.name}`),
      app.publicPath(`/images/${name}`),
      (err) => {
        if (err) response.badRequest()
      }
    )

    await Url.updateOrCreate({ id }, { name, updatedAt: date, jwt })

    return response.redirect().back()
  }
}
