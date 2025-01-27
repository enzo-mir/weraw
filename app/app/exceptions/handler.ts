import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler, errors } from '@adonisjs/core/http'
import { errors as authError } from '@adonisjs/auth'
import type { HttpError, StatusPageRange, StatusPageRenderer } from '@adonisjs/core/types/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  protected renderStatusPages = app.inProduction

  protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    '404': (error, { inertia }) => inertia.render('errors/not_found', { error: error.message }),
    '500..599': (error, { inertia }) =>
      inertia.render('errors/server_error', { error: error.message }),
    '401': (error, { inertia }) => inertia.render('errors/unauthorized', { error: error.message }),
  }

  async handle(error: HttpError, ctx: HttpContext) {
    if (error instanceof errors.E_ROUTE_NOT_FOUND) {
      const undefinedPage = await this.statusPages['404'](error, ctx)

      return ctx.response.status(error.status).send(undefinedPage)
    } else if (error instanceof authError.E_UNAUTHORIZED_ACCESS) {
      return ctx.response
        .status((error as { status: number }).status)
        .send(await this.statusPages['401'](error, ctx))
    } else if (error) {
      const errorPage = await this.statusPages['500..599'](error, ctx)

      return ctx.response.status((error as { status: number }).status).send(errorPage)
    }
    return super.handle(error, ctx)
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
