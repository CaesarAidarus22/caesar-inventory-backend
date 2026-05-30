import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reports'

  async up() {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')

      table.string('petugas').notNullable()

      table.string('product_name').notNullable()

      table.string('report_type').notNullable()

      table.string('priority').notNullable()

      table.text('description').notNullable()

      table.string('status').defaultTo('Pending')

      table.timestamp('created_at').nullable()

      table.timestamp('updated_at').nullable()

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}