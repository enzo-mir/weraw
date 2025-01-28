import type { HttpContext } from '@adonisjs/core/http'
import Url from '#models/url'
import { deleteImage } from '#services/delete_image'
import { storeImages } from '#services/store_images'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { z } from 'zod'
import Photo from '#models/photo'
import { getClientImages } from '#services/get_images'

export default class ImagesController {
  async add({ request, response, session }: HttpContext) {
    const { files } = z
      .object({ files: z.array(z.instanceof(MultipartFile)) })
      .parse(request.allFiles())

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
      return response.status(200).json({ images: await getClientImages({ groupe: photo.groupe }) })
    } catch (error) {
      return response.badRequest({ message: 'Une erreur est survenue' })
    }
  }

  async comment({ request, response, params, inertia }: HttpContext) {
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
    inertia.share({
      images: await getClientImages(params as { groupe: string }),
    })
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

      await Url.updateOrCreate({ id: url!.id }, { endSelected })

      return response.redirect().back()
    } catch (error) {
      console.log(error)
    }
  }
}
