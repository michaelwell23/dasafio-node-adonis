import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Teacher from 'App/Models/Teacher'

export default class TeachersController {
  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'birthdate', 'registration'])

    const teacher = await Teacher.create(data)

    return teacher
  }

  public async show({ params }: HttpContextContract) {
    try {
      const teacher = await Teacher.findOrFail(params.id)

      return teacher
    } catch (err) {
      throw new Error('Data not found.')
    }
  }

  public async update({ request, params }: HttpContextContract) {
    try {
      const data = request.only(['name', 'email', 'birthdate', 'registration'])
      const teacher = await Teacher.findOrFail(params.id)

      teacher.merge(data)

      await teacher.save()

      return teacher
    } catch (err) {
      throw new Error('Unable to edit your data.')
    }
  }

  public async delete({ params }: HttpContextContract) {
    try {
      const teacher = await Teacher.findOrFail(params.id)

      await teacher.delete()

      return {
        message: 'Teacher data deleted successfully',
      }
    } catch (err) {
      throw new Error('Unable to delete your data')
    }
  }
}
