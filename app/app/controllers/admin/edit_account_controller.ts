import { z } from 'zod'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { editAdminSchema } from '../../schemas/edit_admin.schema.js'

export default class EditAccountController {
  async index({ request, session, response, auth }: HttpContext) {
    const payload = request.all()

    try {
      const parsedPayload = await editAdminSchema.parseAsync(payload)
      await User.query()
        .where('email', parsedPayload.email)
        .update({
          email: parsedPayload.newEmail || parsedPayload.email,
          password: parsedPayload.password
            ? await hash.make(parsedPayload.password)
            : auth.user?.password,
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
}
