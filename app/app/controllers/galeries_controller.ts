import Photo from '#models/photo'
import Url from '#models/url'
import { deleteGaleryService } from '#services/delete_galery'
import { deleteImage } from '#services/delete_image'
import { getImages } from '#services/get_images'
import { storeImages } from '#services/store_images'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import fs from 'node:fs'

export default class GaleriesController {
  async show({ inertia, params, request }: HttpContext) {
    const urlData = await Url.query()
      .where('id', params.id)
      .select('end_selected', 'done', 'name', 'created_at', 'id')

    return inertia.render('galery', {
      images: await getImages(params as { id: string }),
      urlData: urlData[0],
    })
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

    const { error } = await deleteGaleryService(id)

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
    db.rawQuery(query).catch(() => {
      return response.status(500)
    })

    fs.rename(
      app.publicPath(`/images/${urlFind.name}`),
      app.publicPath(`/images/${name}`),
      (err) => {
        if (err) response.status(500)
      }
    )

    await Url.updateOrCreate({ id }, { name, createdAt: date })

    return response.redirect().back()
  }

  async addImage({ request, response, session }: HttpContext) {
    const files = request.allFiles().files as MultipartFile[]
    const galeryName = request.only(['galeryName']).galeryName
    try {
      const url = await Url.findByOrFail('name', galeryName)

      const images = await storeImages(galeryName, files, true)
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
