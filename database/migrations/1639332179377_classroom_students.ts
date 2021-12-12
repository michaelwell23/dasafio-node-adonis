import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassroomStudents extends BaseSchema {
  protected tableName = 'classroom_students'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('student_id').unsigned().references('students.id')
      table.integer('classroom_id').unsigned().references('classrooms.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
