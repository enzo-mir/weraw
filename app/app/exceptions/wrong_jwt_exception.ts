import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class WrongJwtException extends Exception {
  public async handle(ctx: HttpContext) {
    return ctx.response.status(404)
  }

  async report(error: this, ctx: HttpContext) {
    ctx.logger.error({ err: error }, error.message)
  }
}
