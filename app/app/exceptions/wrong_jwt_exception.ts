import { ExceptionHandler, HttpContext } from '@adonisjs/core/http'
import { HttpError } from '@adonisjs/core/types/http'

export default class WrongJwtException extends ExceptionHandler {
  async handle(error: HttpError, ctx: HttpContext) {
    if (ctx.response.headersSent) {
      return
    }

    ctx.response.status(error.status).send({
      message: error.message,
      status: error.status,
    })
  }
}
