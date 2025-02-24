import Customer from '#models/customer'
import { SessionGuestType } from '#schemas/types/session_guest.type'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SessionMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const guestSession: SessionGuestType | undefined = ctx.session.get('session_guest')
    const jwt = ctx.params.jwt
    const customer = await Customer.findBy({ id: guestSession?.id })

    if (guestSession === undefined || guestSession.jwt !== ctx.params.jwt || !customer) {
      return ctx.response.redirect(`/galery/${jwt}/guard`)
    }

    return next()
  }
}
