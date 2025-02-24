import JwtException from '#exceptions/jwt_exception'
import Galery from '#models/galery'
import { jwtVerifier } from '#services/jwt_service'
import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class JwtMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const jwt = ctx.params.jwt
    const verify = await jwtVerifier(jwt)
    const galery = await Galery.query().where('jwt', jwt).first()

    if (!jwt || !verify || !galery) {
      throw new JwtException('invalid signature', {
        status: 401,
      })
    }

    return next()
  }
}
