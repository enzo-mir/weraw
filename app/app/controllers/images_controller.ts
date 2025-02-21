import type { HttpContext } from '@adonisjs/core/http'
import Galery from '#models/galery'
import { storeImages } from '#services/store_images'
import Photo from '#models/photo'
import { jwtMaker } from '#services/jwt_service'
import { mailerService } from '#services/mailer'
import app from '@adonisjs/core/services/app'
import env from '#start/env'
import { addImageSchema, commentImage, endSelection } from '#schemas/image.schema'
import { deleteImage } from '#services/delete_image'
import PhotoActionsCustomer from '#models/photo_actions_customer'

export default class ImagesController {
  async add({ request, response, session }: HttpContext) {
    const { files, galeryName } = addImageSchema.parse({ ...request.allFiles(), ...request.all() })

    try {
      const url = await Galery.findByOrFail('name', galeryName)

      const imagesUrl = await storeImages(galeryName, files, true, url.groupe)

      await Photo.createMany(imagesUrl)

      return response.redirect().back()
    } catch (error) {
      session.flash({ errors: { message: "Erreur lors de l'ajout des images" } })
      return response.redirect().back()
    }
  }
  public async delete({ session, response, request }: HttpContext) {
    const urls: Array<string> = request.only(['urls']).urls

    try {
      await deleteImage(urls)
      return response.ok({ message: 'Image supprimée avec succès' })
    } catch (error) {
      session.flash({ errors: { message: error.message } })
      return response.status(400).send({ message: error.message })
    }
  }

  async like({ request, response, session }: HttpContext) {
    const { id, liked } = request.all()

    const photo = await Photo.query().where('id', id).first()

    if (!photo) {
      return response.badRequest({ message: 'Image introuvable' })
    }
    try {
      const sessionGuest = session.get('session_guest')
      const t = await PhotoActionsCustomer.updateOrCreate(
        {
          photo_id: id,
          customer_id: sessionGuest.id,
        },
        {
          customer_id: sessionGuest.id,
          photo_id: id,
          like: Boolean(liked),
        }
      )

      console.log(t)

      return response.ok({ message: 'Like mis à jour' })
    } catch (error) {
      return response.badRequest({ message: 'Une erreur est survenue' })
    }
  }

  async comment({ request, response, params, session }: HttpContext) {
    try {
      const { imageId, comment } = commentImage.parse({ ...params, ...request.all() })

      await Photo.query().update({ comment }).where('id', imageId)

      return response.ok({ message: 'Commentaire mis à jour' })
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

      const galery = await Galery.query().where('id', urlId).first()
      const token = await jwtMaker(galery!.groupe, this.nextDay.toISOString())

      if (token instanceof Error) {
        session.flash({ errors: { message: 'Une erreur est survenue' } })
        return response.badRequest()
      }
      const url = `http${app.inDev ? '' : 's'}://photos.${app.inDev ? 'localhost:3000' : env.get('DOMAIN')}/galery/${token.token}`
      const urlMail = `http${app.inDev ? '' : 's'}://${app.inDev ? 'localhost:3000' : env.get('DOMAIN')}/galery/${galery!.id}`
      const urlUpdate = await Galery.updateOrCreate(
        { id: galery?.id },
        { endSelected, jwt: token.token, exp: token.exp, url: url }
      )
      mailerService({
        name: urlUpdate.name,
        createdAt: new Date(urlUpdate.createdAt?.toISO() ?? '').toLocaleDateString(),
        url: urlMail,
      })

      return response.ok({ url })
    } catch (error) {
      return response.badRequest()
    }
  }
}
