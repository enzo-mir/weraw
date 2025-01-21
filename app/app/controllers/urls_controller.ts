import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class UrlsController {
  async changeStatus(ctx: HttpContext) {
    const value: boolean = ctx.request.only(['value']).value
    const urlId: boolean = ctx.request.only(['urlId']).urlId
    try {
      await db
        .from('urls')
        .update({
          done: value,
        })
        .where('id', urlId)
      return ctx.response.redirect().back()
    } catch (error) {
      ctx.response.badRequest()
    }
  }
}
