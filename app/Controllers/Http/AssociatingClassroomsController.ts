import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import Classroom from 'App/Models/Classroom'

export default class AssociatingClassroomsController {
  public async show({ params }: HttpContextContract) {
    try {
      const classroom = await Classroom.findOrFail(params.id)

      await classroom.preload('students')

      return classroom
    } catch (error) {
      throw new Error('')
    }
  }

  public async store({ request, params }: HttpContextContract) {
    const { registrationTeacher, registrationStudent } = request.only([
      'registrationTeacher',
      'registrationStudent',
    ])
    const classroom = await Classroom.find(params.id)

    if (!classroom) {
      throw new Error('Classroom ID does not exists')
    }
    const student = await Student.findBy('registration', registrationStudent)

    if (!student) {
      throw new Error('No students found with this registration ')
    }

    await classroom.preload('students')
    await classroom.preload('teachers')
    await classroom.preload('students')

    if (classroom.teachers.registration !== registrationTeacher) {
      throw new Error('Registration invalid informed')
    }

    if (classroom.availability === false) {
      throw new Error('classroom is full')
    }

    if (classroom.students.find((studentAux) => studentAux.registration === registrationStudent)) {
      throw new Error('student is already registered')
    }

    await classroom.related('students').attach([student.id])

    await classroom.preload('students')

    if (classroom.students.length === classroom.capacity_max_class) {
      classroom.availability = false
      await classroom.save()
    }

    return { massege: 'The student was successfully registered in the classrooms' }
  }

  public async delete({ request, params }: HttpContextContract) {
    const { registrationTeacher, registrationStudent } = request.only([
      'registrationTeacher',
      'registrationStudent',
    ])

    const classroom = await Classroom.find(params.id)

    if (!classroom) {
      throw new Error('Classroom ID does not exists')
    }

    const student = await Student.findBy('registration', registrationStudent)

    if (!student) {
      throw new Error('No students found with this registration ')
    }

    await classroom.preload('students')
    await classroom.preload('teachers')
    await classroom.preload('students')

    if (classroom.teachers.registration !== registrationTeacher) {
      throw new Error('Registration invalid informed')
    }

    if (!classroom.students.find((studentAux) => studentAux.registration === registrationStudent)) {
      throw new Error('student is not registered')
    }

    await classroom.related('students').detach([student.id])

    if (classroom.students.length === classroom.capacity_max_class) {
      classroom.availability = true
      await classroom.save()
    }

    await classroom.preload('students')

    return {
      message: 'The student has been removed from the classroom',
    }
  }
}
