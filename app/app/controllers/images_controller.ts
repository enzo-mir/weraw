import type { HttpContext } from '@adonisjs/core/http'
import Url from '#models/url'
import { deleteImage } from '#services/delete_image'
import { storeImages } from '#services/store_images'
import Photo from '#models/photo'
import { jwtMaker } from '#services/jwt_service'
import { mailerService } from '#services/mailer'
import app from '@adonisjs/core/services/app'
import env from '#start/env'
import { addImageSchema, commentImage, endSelection } from '#schemas/image.schema'

export default class ImagesController {
  async add({ request, response, session }: HttpContext) {
    const { files, galeryName } = addImageSchema.parse({ ...request.allFiles(), ...request.all() })

    try {
      const url = await Url.findByOrFail('name', galeryName)

      await storeImages(galeryName, files, true, url.groupe)

      return response.redirect().back()
    } catch (error) {
      session.flash({ errors: { message: "Erreur lors de l'ajout des images" } })
      return response.redirect().back()
    }
  }
  async delete({ session, response, params }: HttpContext) {
    const { error } = await deleteImage(params.id)
    if (error) {
      session.flash({ errors: { message: error } })
      return response.redirect().back()
    }
    return response.redirect().back()
  }

  async like({ request, response, session }: HttpContext) {
    const { id } = request.only(['id'])
    const photo = await Photo.query().where('id', id).first()

    if (!photo) {
      session.flash({ errors: { message: 'Image introuvable' } })
      return response.redirect().back()
    }
    try {
      await Photo.updateOrCreate({ id }, { like: !photo.like })
      return response.redirect().back()
    } catch (error) {
      session.flash({ errors: { message: 'Une erreur est survenue' } })
      return response.redirect().back()
    }
  }

  async comment({ request, response, params, session, inertia }: HttpContext) {
    try {
      const { imageId, comment } = commentImage.parse({ ...params, ...request.only(['comment']) })
      await Photo.updateOrCreate({ id: imageId }, { comment })

      return response.redirect().back()
    } catch (error) {
      session.flash({ errors: { message: 'Image introuvable' } })
      return response.redirect().back()
    }
  }

  private nextDay = new Date(new Date().setDate(new Date().getDate() + 1))

  async end_selection({ request, response, params, session }: HttpContext) {
    try {
      const { urlId, endSelected } = await endSelection.parseAsync({
        ...params,
        ...request.only(['end_selected']),
      })

      const url = await Url.query().where('id', urlId).first()
      const token = await jwtMaker(url!.groupe, this.nextDay.toISOString())

      if (typeof token !== 'string') {
        session.flash({ errors: { message: 'Une erreur est survenue' } })
        return response.badRequest()
      }

      const urlUpdate = await Url.updateOrCreate({ id: urlId }, { endSelected, jwt: token })

      await mailerService({
        name: urlUpdate.name,
        createdAt: new Date(urlUpdate.createdAt?.toISO() ?? '').toLocaleDateString(),
        url: app.inProduction ? env.get('BASE_URL') : 'http://127.0.0.1:3000/',
      })

      return response.status(200).json({ token })
    } catch (error) {
      session.flash({ errors: { message: 'Image introuvable' } })
      return response.redirect().back()
    }
  }
}
