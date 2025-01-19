import env from '#start/env'
import hash from '@adonisjs/core/services/hash'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email', 254).notNullable().unique()
      table.string('password', 255).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
    this.defer(async (db) => {
      await db.table(this.tableName).insert({
        id: null,
        email: env.get('ADMIN_EMAIL'),
        password: await hash.make('test'),
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
