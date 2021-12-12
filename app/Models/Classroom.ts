import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Teacher from './Teacher'
import Student from './Student'

export default class Classroom extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public teacherId: number

  @belongsTo(() => Teacher, {
    foreignKey: 'teacherId',
  })
  public teachers: BelongsTo<typeof Teacher>

  @column()
  public number_class: number

  @column()
  public capacity_max_class: number

  @column()
  public availability: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Student, {
    pivotTable: 'classroom_students',
  })
  public students: ManyToMany<typeof Student>
}
