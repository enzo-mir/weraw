import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Galery from './galery.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import type { UUID } from 'node:crypto'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare groupe: UUID

  @column()
  declare name: string

  @column()
  declare color: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @hasOne(() => Galery, {
    foreignKey: 'groupe',
  })
  declare galery: HasOne<typeof Galery>
}
