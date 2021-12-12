import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'

export default class StudentsController {
  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'birthdate', 'registration'])

    const student = await Student.create(data)

    return student
  }

  public async show({ params }: HttpContextContract) {
    try {
      const student = await Student.findOrFail(params.id)
      const classrooms = await student.related('classrooms').query().preload('teachers')

      return {
        ...student.$attributes,
        classrooms: classrooms.map((classroom) => {
          return {
            classroom: classroom.number_class,
            teacher: classroom.teachers.name,
          }
        }),
      }
    } catch (error) {
      throw new Error('Data not found.')
    }
  }

  public async update({ request, params }: HttpContextContract) {
    try {
      const student = await Student.findOrFail(params.id)
      const data = request.only(['name', 'email', 'birthdate', 'registration'])

      student.merge(data)

      await student.save()

      return student
    } catch (error) {
      throw new Error('Unable to edit your data.')
    }
  }

  public async delete({ params }: HttpContextContract) {
    try {
      const student = await Student.findOrFail(params.id)

      await student.delete()

      return {
        message: 'Student data deleted successfully',
      }
    } catch (err) {
      throw Error('Unable to delete your data.')
    }
  }
}
