import Route from '@ioc:Adonis/Core/Route'

Route.get('students/:id', 'StudentsController.show')
Route.post('students', 'StudentsController.store')
Route.put('students/:id', 'StudentsController.update')
Route.delete('students/:id', 'StudentsController.delete')

Route.get('teachers/:id', 'TeachersController.show')
Route.post('teachers', 'TeachersController.store')
Route.put('teachers/:id', 'TeachersController.update')
Route.delete('teachers/:id', 'TeachersController.delete')

Route.get('classrooms', 'ClassroomsController.index')
Route.get('classrooms/:id', 'ClassroomsController.show')
Route.post('classrooms/:id', 'ClassroomsController.store')
Route.put('classrooms/:id', 'ClassroomsController.update')
Route.delete('classrooms/:id', 'ClassroomsController.delete')

Route.post('classrooms/:id/allocation', 'AssociatingClassroomsController.store')
Route.delete('classrooms/:id/allocation', 'AssociatingClassroomsController.delete')
Route.get('classrooms/:id/allocation', 'AssociatingClassroomsController.show')
