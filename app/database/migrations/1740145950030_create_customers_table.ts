import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('groupe').notNullable()
      table.foreign('groupe').references('galeries.groupe').onDelete('CASCADE').onUpdate('CASCADE')
      table.string('name', 255).notNullable()
      table.string('color', 16).notNullable()
      table.timestamp('created_at')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.unique(['groupe', 'color'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
