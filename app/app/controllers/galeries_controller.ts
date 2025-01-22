import Photo from '#models/photo'
import Url from '#models/url'
import { deleteGaleryService } from '#services/delete_galery'
import { deleteImage } from '#services/delete_image'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import fs from 'node:fs'

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

  async deleteGalery(ctx: HttpContext) {
    const { id } = ctx.params

    const { error, success } = await deleteGaleryService(id)

    if (error) ctx.response.notFound()
    return ctx.response.redirect().toPath('/dashboard')
  }

  async editGalery({ request, response, params }: HttpContext) {
    const { id } = params
    const { name, date } = request.all()

    const urlFind = await Url.find(id)

    if (!urlFind) return response.notFound()

    const query = `
      UPDATE photos
      SET url = REPLACE(url, '${urlFind.name}', '${name}')
      WHERE groupe = '${urlFind.groupe}';
    `
    db.rawQuery(query).then((e) => {
      console.log(e)
    })

    /*   await db
      .from('photos')
      .where('groupe', url.groupe)
      .select('url')
      .update({ url: name }) */

    fs.rename(app.publicPath(`/images/${urlFind.name}`), app.publicPath(`/images/${name}`), (e) => {
      console.log(e)
    })

    await Url.updateOrCreate({ id }, { name, createdAt: date })

    return response.redirect().back()
  }
}
