import WrongJwtException from '#exceptions/wrong_jwt_exception'
import { jwtVerifier } from '#services/jwt_service'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class JwtMiddleware {
  jwtRegex = /([A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+)$/
  async handle(ctx: HttpContext, next: NextFn) {
    const url = ctx.request.url()
    const match = url.match(this.jwtRegex)

    const jwt = match ? match[1] : null
    try {
      if (!jwt) throw new Error('Invalid jwt')
      const verify = await jwtVerifier(jwt)
      if (!verify) throw new Error('Invalid jwt')

      return await next()
    } catch (error) {
      throw new WrongJwtException()
    }
  }
}
