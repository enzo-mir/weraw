import type { HttpContext } from '@adonisjs/core/http'
import Galery from '#models/galery'
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
      const url = await Galery.findByOrFail('name', galeryName)

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

  async comment({ request, response, params, session }: HttpContext) {
    try {
      const { imageId, comment } = commentImage.parse({ ...params, ...request.all() })

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
      const { urlId, end_selected: endSelected } = await endSelection.parseAsync({
        ...params,
        ...request.all(),
      })

      const url = await Galery.query().where('id', urlId).first()
      const token = await jwtMaker(url!.groupe, this.nextDay.toISOString())

      if (typeof token !== 'string') {
        session.flash({ errors: { message: 'Une erreur est survenue' } })
        return response.badRequest()
      }

      const urlUpdate = await Galery.updateOrCreate({ id: urlId }, { endSelected, jwt: token })
      const baseurl = app.inProduction ? env.get('BASE_URL') : 'http://127.0.0.1:3000/'
      mailerService({
        name: urlUpdate.name,
        createdAt: new Date(urlUpdate.createdAt?.toISO() ?? '').toLocaleDateString(),
        url: baseurl + 'galery/admin/' + urlId,
      })

      return response.redirect().toRoute('client.galery', { jwt: token })
    } catch (error) {
      return response.badRequest()
    }
  }
}
