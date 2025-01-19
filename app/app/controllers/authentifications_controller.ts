import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthentificationsController {
  public async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.all()

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      return response.redirect('/dashboard')
    } catch (error) {
      return response.redirect('/login')
    }
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
