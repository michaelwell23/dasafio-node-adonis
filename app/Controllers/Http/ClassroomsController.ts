import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom'
import Teacher from 'App/Models/Teacher'

export default class ClassroomsController {
  public async index({}: HttpContextContract) {
    const classrooms = await Classroom.query().preload('teachers')

    return classrooms.map((classroom) => {
      return classroom
    })
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only([
      'registration_teacher',
      'number_class',
      'capacity_max_class',
      'availability',
    ])

    const teacher = await Teacher.findBy('registration', data.registration_teacher)

    if (!teacher) {
      throw new Error('Invalid teacher registration number')
    }

    const classroom = await Classroom.create({
      number_class: data.number_class,
      capacity_max_class: data.capacity_max_class,
      availability: data.availability,
    })

    await classroom.related('teachers').associate(teacher)

    await classroom.preload('teachers')

    return classroom
  }

  public async show({ params }: HttpContextContract) {
    try {
      const classroom = await Classroom.findOrFail(params.id)

      await classroom.preload('teachers')

      return classroom
    } catch (error) {
      throw new Error('The classroom does not exist')
    }
  }

  public async update({ request, params }: HttpContextContract) {
    try {
      const classroom = await Classroom.findOrFail(params.id)
      const data = request.only(['number_class', 'capacity_max_class', 'availability'])

      classroom.merge(data)
      await classroom.save()

      return classroom
    } catch (error) {
      throw new Error('Could not update classroom')
    }
  }

  public async delete({ params }: HttpContextContract) {
    try {
      const classroom = await Classroom.findOrFail(params.id)

      await classroom.delete()

      return {
        message: 'Classroom data deleted successfully',
      }
    } catch (error) {
      throw new Error('')
    }
  }
}
