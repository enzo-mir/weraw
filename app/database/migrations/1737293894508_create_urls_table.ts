import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'urls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.uuid('groupe').notNullable().unique().defaultTo(this.db.rawQuery('uuid()').knexQuery)
      table.boolean('done').notNullable().defaultTo(false)
      table.string('jwt').notNullable().unique()
      table.boolean('end_selected').notNullable().defaultTo(false)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
