import type { HttpContext } from '@adonisjs/core/http'
import Url from '#models/url'
import { deleteImage } from '#services/delete_image'
import { storeImages } from '#services/store_images'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { z } from 'zod'
import Photo from '#models/photo'
import { jwtMaker } from '#services/jwt_service'
import { mailerService } from '#services/mailer'
import app from '@adonisjs/core/services/app'
import env from '#start/env'

export default class ImagesController {
  async add({ request, response, session }: HttpContext) {
    const { files } = z
      .object({
        files: z.union([z.array(z.instanceof(MultipartFile)), z.instanceof(MultipartFile)]),
      })
      .parse(request.allFiles())

    const galeryName = request.only(['galeryName']).galeryName
    try {
      const url = await Url.findByOrFail('name', galeryName)

      await storeImages(galeryName, files, true, url.groupe)

      return response.redirect().back()
    } catch (error) {
      session.flash({ errors: { message: error.message } })
      return response.redirect().back()
    }
  }
  async delete({ session, response, params }: HttpContext) {
    const { error } = await deleteImage(params.id)
    if (error) {
      session.flash({ error })
      return response.badRequest()
    }
    return response.redirect().back()
  }

  async like({ request, response }: HttpContext) {
    const { id } = request.only(['id'])
    const photo = await Photo.query().where('id', id).first()

    if (!photo) {
      return response.badRequest({ message: 'Image introuvable' })
    }
    try {
      await Photo.updateOrCreate({ id }, { like: !photo.like })
      return response.redirect().back()
    } catch (error) {
      return response.badRequest({ message: 'Une erreur est survenue' })
    }
  }

  async comment({ request, response, params }: HttpContext) {
    const { comment } = request.only(['comment'])
    const { groupe, imageId } = z
      .object({
        groupe: z.string().transform((v) => v.trim().replaceAll(' ', '')),
        imageId: z.string().transform((v) => Number.parseInt(v.trim())),
      })
      .parse(params)

    const photo = await Photo.query().where('groupe', groupe).andWhere('id', imageId).first()

    if (!photo) {
      return response.badRequest({ message: 'Image introuvable' })
    }
    await Photo.updateOrCreate({ id: imageId }, { comment })

    return response.redirect().back()
  }

  async end_selection({ request, response, params }: HttpContext) {
    try {
      const { groupe, urlId } = await z
        .object({
          groupe: z.string().transform((v) => v.trim().replaceAll(' ', '')),
          urlId: z.string().transform((v) => Number.parseInt(v.trim())),
        })
        .parseAsync(params)

      const endSelected: boolean = request.only(['end_selected']).end_selected

      const url = await Url.query().where('id', urlId).andWhere('groupe', groupe).first()
      const newdate = new Date(new Date().setDate(new Date().getDate() + 1))
      const token = await jwtMaker(url!.groupe, newdate.toISOString())
      if (typeof token !== 'string') return response.badRequest()

      const urlUpdate = await Url.updateOrCreate({ id: url!.id }, { endSelected, jwt: token })
      await mailerService({
        name: urlUpdate.name,
        createdAt: new Date(urlUpdate.createdAt?.toISO() ?? '').toLocaleDateString(),
        url: app.inProduction ? env.get('BASE_URL') : 'http://127.0.0.1:3000/',
      })

      return response.status(200).json({ token })
    } catch (error) {
      return response.badRequest({ message: 'Image introuvable' })
    }
  }
}
