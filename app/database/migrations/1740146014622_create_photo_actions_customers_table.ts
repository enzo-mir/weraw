import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'photo_actions_customers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('photo_id').unsigned().notNullable()
      table.foreign('photo_id').references('photos.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('customer_id').unsigned().notNullable()
      table
        .foreign('customer_id')
        .references('customers.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.boolean('like').notNullable().defaultTo(false)
      table.string('comment', 200).nullable().defaultTo(null)
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
