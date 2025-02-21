import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Photo from './photo.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class PhotoActionsCustomer extends BaseModel {
  static table = 'photo_actions_customers'

  @column()
  declare photo_id: number

  @column()
  declare customer_id: number

  @column()
  declare like: boolean

  @column()
  declare comment: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @hasOne(() => Photo)
  declare photos: HasOne<typeof Photo>

  @hasOne(() => Photo)
  declare customers: HasOne<typeof Photo>
}
