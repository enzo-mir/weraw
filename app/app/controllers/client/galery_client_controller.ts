import Customer from '#models/customer'
import Galery from '#models/galery'
import { getClientImages } from '#services/get_images'
import type { HttpContext } from '@adonisjs/core/http'

export default class GaleryClientController {
  public getGalery = async (jwt: string) => {
    return await Galery.query().where('jwt', jwt).firstOrFail()
  }

  public maxProfile = 8

  async show({ inertia, params, request }: HttpContext) {
    const qs: 'all' | 'liked' | 'comment' | null = request.qs().filter

    const galery = await this.getGalery(params.jwt)

    const urlData = await Galery.query()
      .where('groupe', galery.groupe)
      .select('end_selected', 'url', 'name', 'created_at', 'id')
      .first()
    const images = await getClientImages({ groupe: galery.groupe }, qs)
    const exp = new Date(galery.exp * 1000)
    return inertia.render('client/galery', {
      images,
      urlData,
      exp,
    })
  }

  async guard({ inertia, params }: HttpContext) {
    const { name, groupe } = await this.getGalery(params.jwt)

    const profiles = await Customer.query().select('name', 'color').where({ groupe })

    return inertia.render('client/guard', {
      galeryName: name,
      profiles,
    })
  }

  async create_profile({ request, response, params, session }: HttpContext) {
    try {
      const { name, color } = request.only(['name', 'color'])
      const { groupe } = await this.getGalery(params.jwt)

      const isMaxed = await Customer.query().where({ groupe })

      if (isMaxed.length >= this.maxProfile) {
        session.flash('errors', {
          message: 'Vous avez atteint le nombre maximum de profil',
        })
        return response.redirect().back()
      }

      await Customer.create({ name, color, groupe })

      return response.redirect().back()
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        session.flash('errors', { message: 'La couleur est déjà utilisé' })
      } else {
        session.flash('errors', {
          message: 'Une erreur est survenue lors de la création du profil',
        })
      }

      return response.redirect().back()
    }
  }
}
