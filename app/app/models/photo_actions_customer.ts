import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Photo from './photo.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class PhotoActionsCustomer extends BaseModel {
  static table = 'photo_actions_customers'

  @hasOne(() => Photo)
  declare photo_id: HasOne<typeof Photo>

  @hasOne(() => Photo)
  declare customer_id: HasOne<typeof Photo>

  @column()
  declare like: boolean

  @column()
  declare comment: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
