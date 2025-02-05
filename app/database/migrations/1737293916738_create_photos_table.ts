import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'photos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('groupe').notNullable()
      table.foreign('groupe').references('urls.groupe').onDelete('CASCADE').onUpdate('CASCADE')
      table.string('url', 255).notNullable()
      table.boolean('like').notNullable()
      table.string('comment', 255).nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
