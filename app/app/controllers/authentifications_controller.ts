import User from '#models/user'
import { authSchema } from '#schemas/auth.schema'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthentificationsController {
  public async login({ auth, request, response, session }: HttpContext) {
    const { email, password } = request.all()

    try {
      const payload = authSchema.parse({ email, password })
      const user = await User.verifyCredentials(payload.email, payload.password)

      await auth.use('web').login(user)
      return response.redirect('/dashboard')
    } catch (error) {
      console.log(error)

      session.flash({ errors: { message: 'Email ou mot de passe incorrect' } })
      return response.redirect().back()
    }
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
