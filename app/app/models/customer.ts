import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Galery from './galery.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => Galery)
  declare groupe: HasOne<typeof Galery>

  @column()
  declare name: string

  @column()
  declare color: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
