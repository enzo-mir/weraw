import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Photo from './photo.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { UUID } from 'node:crypto'

export default class Galery extends BaseModel {
  static table = 'galeries'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare url: string

  @column()
  declare endSelected: boolean

  @column()
  declare groupe: UUID

  @column()
  declare jwt: string

  @column()
  declare exp: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Photo, {
    foreignKey: 'groupe',
  })
  declare photos: HasMany<typeof Photo>
}
