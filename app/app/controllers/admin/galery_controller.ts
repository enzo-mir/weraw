import { deleteGaleryService } from '#services/delete_galery'
import { getAdminImages } from '#services/get_images'
import { jwtMaker, jwtVerifier } from '#services/jwt_service'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import fs from 'node:fs'
import { storeImages } from '#services/store_images'
import { randomUUID } from 'node:crypto'
import { addGalery, editGalery } from '#schemas/galery.schema'
import { z } from 'zod'
import env from '#start/env'
import Galery from '#models/galery'

export default class GaleriesController {
  async show(ctx: HttpContext) {
    try {
      const urlData = await Galery.query()
        .where('id', ctx.params.id)
        .select('end_selected', 'name', 'url', 'created_at', 'id', 'groupe', 'jwt')
        .first()

      const exp = await jwtVerifier(urlData!.jwt)
        .then((e) => e.exp)
        .catch((e) => new Date(e.expiredAt).getTime() / 1000)

      const images = await getAdminImages(ctx.params as { id: string })

      return ctx.inertia.render('admin/galery', {
        images,
        urlData,
        exp,
      })
    } catch (error) {
      return ctx.inertia.render('errors/not_found')
    }
  }

  public async create({ request, response, session }: HttpContext) {
    try {
      const { name, date, files } = await addGalery.parseAsync({
        ...request.all(),
        ...request.allFiles(),
      })

      const groupe = randomUUID()
      const jwt = await jwtMaker(groupe)
      const url = `http://photos.${app.inDev ? 'localhost:3000' : env.get('DOMAIN')}/${jwt}`
      const galery = await Galery.create({ name, createdAt: date, groupe, jwt: jwt as string, url })

      await storeImages(name, files, false, galery.groupe)
      return response.redirect().back()
    } catch (error) {
      if ((error as any).code === 'ER_DUP_ENTRY') {
        session.flash({ errors: { message: 'Ce nom est déjà utilisé' } })
      } else if (error instanceof z.ZodError) {
        session.flash({
          errors: {
            message: error.issues[0].message,
          },
        })
      } else {
        session.flash({
          errors: { message: (error as any).message },
        })
      }
      return response.redirect().back()
    }
  }

  async delete(ctx: HttpContext) {
    const { id } = ctx.params

    const { error } = await deleteGaleryService(id)

    if (error) ctx.response.notFound()
    return ctx.response.redirect().toPath('/dashboard')
  }

  async edit({ request, response, params, session }: HttpContext) {
    const { name, date, exp, id } = editGalery.parse({ ...request.all(), ...params })
    try {
      const urlFind = await Galery.findOrFail(id)

      const token = exp && (await jwtMaker(urlFind.groupe, exp))

      const query = `
         UPDATE photos
         SET url = REPLACE(url, '${urlFind.name}', '${name}')
         WHERE groupe = '${urlFind.groupe}';
      `
      db.rawQuery(query).catch(() => new Error('Error while updating photos'))

      fs.rename(
        app.publicPath(`/images/${urlFind.name}`),
        app.publicPath(`/images/${name}`),
        (err) => {
          if (err) throw new Error('Error while updating photos')
        }
      )

      if (typeof token === 'string') {
        const url = `http://photos.${app.inDev ? 'localhost:3000' : env.get('DOMAIN')}/${token}`
        await Galery.updateOrCreate(
          { id },
          { name, updatedAt: date, createdAt: date, jwt: token, url }
        )
      } else {
        await Galery.updateOrCreate({ id }, { name, updatedAt: date, createdAt: date })
      }

      return response.redirect().back()
    } catch (error) {
      session.flash({ errors: { message: 'Une erreur est survenue' } })
      return response.redirect().back()
    }
  }
}
