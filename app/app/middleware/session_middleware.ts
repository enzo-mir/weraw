import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SessionMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (ctx.session.get('session_guest') === undefined) {
      const jwt = ctx.params.jwt
      return ctx.response.redirect(`/galery/${jwt}/guard`)
    } else {
      return next()
    }
  }
}
