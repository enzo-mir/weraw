import User from '#models/user'
import { authSchema } from '#schemas/auth.schema'
import type { HttpContext } from '@adonisjs/core/http'
import { z } from 'zod'
import hash from '@adonisjs/core/services/hash'
import { editAdminSchema } from '../../schemas/edit_admin.schema.js'
import Customer from '#models/customer'

export default class AuthentificationsController {
  public async login({ auth, request, response, session }: HttpContext) {
    const { email, password } = request.all()

    try {
      const payload = authSchema.parse({ email, password })
      const user = await User.verifyCredentials(payload.email, payload.password)

      await auth.use('web').login(user)
      return response.redirect('/dashboard')
    } catch (error) {
      if (error instanceof z.ZodError) {
        session.flash({ errors: { message: 'Veuillez entrez un email valide' } })
      } else {
        session.flash({ errors: { message: 'Adresse email ou mot de passe incorrect' } })
      }
      return response.redirect().back()
    }
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }

  public async edit({ request, response, session }: HttpContext) {
    try {
      const parsedPayload = await editAdminSchema.parseAsync(request.all())

      await User.query()
        .where('email', parsedPayload.email)
        .update({
          email: parsedPayload.newEmail || parsedPayload.email,
        })
        .if(parsedPayload.password !== undefined, async (q) => {
          return q.update({ password: await hash.make(parsedPayload.password!) })
        })
      return response.redirect().back()
    } catch (error) {
      if (error instanceof z.ZodError) {
        session.flash({ errors: error.issues[0] })
      } else {
        session.flash({ errors: { message: 'Une erreur est survenue' } })
      }

      return response.redirect().back()
    }
  }

  async delet_profile(ctx: HttpContext) {
    const userId = ctx.params.id
    try {
      const customer = await Customer.findByOrFail({ id: userId })
      await customer.delete()
      ctx.session.flash({ success: 'Profil supprimé avec succès' })
      return ctx.response.redirect().back()
    } catch (error) {
      ctx.session.flash({ errors: { message: 'Profil introuvable' } })
      return ctx.response.redirect().back()
    }
  }
}
