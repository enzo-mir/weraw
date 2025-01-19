import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import Photo from './photo.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Url extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare done: boolean

  @column()
  declare endSelected: boolean

  @column()
  declare groupe: UUID

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Photo, {
    foreignKey: 'groupe',
  })
  declare photos: HasMany<typeof Photo>
}
