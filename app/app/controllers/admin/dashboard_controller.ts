import { groupedGaleriesByName } from '#services/get_galery_dashboard'

import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  public async index(ctx: HttpContext) {
    const galeries = await groupedGaleriesByName()

    const email = ctx.auth.user?.email

    return ctx.inertia.render('admin/dashboard', { galeries, user: { email } })
  }
}
