import type { HttpContext } from '@adonisjs/core/http'
import Galery from '#models/galery'
import { storeImages } from '#services/store_images'
import Photo from '#models/photo'
import { addImageSchema, commentImage } from '#schemas/image.schema'
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
      await PhotoActionsCustomer.updateOrCreate(
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
      return response.ok({ message: 'Like mis à jour' })
    } catch (error) {
      return response.badRequest({ message: 'Une erreur est survenue' })
    }
  }

  async comment({ request, response, session }: HttpContext) {
    try {
      const { id, comment } = commentImage.parse(request.all())

      const photo = await Photo.query().where({ id }).first()

      if (!photo) {
        return response.badRequest({ message: 'Image introuvable' })
      }
      const sessionGuest = session.get('session_guest')
      await PhotoActionsCustomer.updateOrCreate(
        {
          photo_id: id,
          customer_id: sessionGuest.id,
        },
        {
          customer_id: sessionGuest.id,
          photo_id: id,
          comment,
        }
      )

      return response.ok({ message: 'Commentaire mis à jour' })
    } catch (error) {
      session.flash({ errors: { message: 'Erreur lors de la mise à jour du commentaire' } })
      return response.redirect().back()
    }
  }
}
