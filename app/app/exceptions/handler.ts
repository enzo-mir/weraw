import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler, errors } from '@adonisjs/core/http'
import { errors as authErrors } from '@adonisjs/auth'
import type { HttpError } from '@adonisjs/core/types/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction
  protected renderStatusPages = app.inProduction

  private getErrorMessage(error: HttpError): string {
    if (
      error instanceof errors.E_ROUTE_NOT_FOUND ||
      error instanceof authErrors.E_UNAUTHORIZED_ACCESS
    ) {
      return 'La page que vous cherchez est introuvable'
    }

    if (
      error.message === 'invalid signature' ||
      error.message === 'jwt expired' ||
      error.message === 'invalid token'
    ) {
      return 'Le lien est invalide ou expiré'
    }

    return 'Une erreur serveur est survenue'
  }

  protected page = (ctx: HttpContext, error: string) =>
    ctx.inertia.render('errors/page', { error: error })

  async handle(error: HttpError, ctx: HttpContext) {
    const errorMessage = this.getErrorMessage(error)
    if (errorMessage) {
      return ctx.response.status(error.status).send(await this.page(ctx, errorMessage))
    }
    return super.handle(error, ctx)
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
