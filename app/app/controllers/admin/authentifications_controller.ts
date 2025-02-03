import User from '#models/user'
import { authSchema } from '#schemas/auth.schema'
import type { HttpContext } from '@adonisjs/core/http'
import { z } from 'zod'

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
}
