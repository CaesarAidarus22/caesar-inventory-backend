import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')

      table.string('name').notNullable()

      table.string('category').notNullable()

      table.integer('stock').notNullable()

      table.string('status').notNullable()

      table.string('image').nullable()

      table.timestamp('created_at').nullable()

      table.timestamp('updated_at').nullable()

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}