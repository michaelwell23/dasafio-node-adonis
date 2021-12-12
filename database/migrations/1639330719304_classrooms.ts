import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Classrooms extends BaseSchema {
  protected tableName = 'classrooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('teacher_id').unsigned().references('teachers.id').onDelete('cascade')
      table.integer('number_class').notNullable()
      table.integer('capacity_max_class').notNullable()
      table.boolean('availability').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
