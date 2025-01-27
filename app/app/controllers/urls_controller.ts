import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { z } from 'zod'

export default class UrlsController {
  async changeStatus(ctx: HttpContext) {
    try {
      const { value, urlId } = await z
        .object({
          value: z.boolean(),
          urlId: z.number(),
        })
        .parseAsync(ctx.request.all())
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
