import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ view, response }: HttpContextContract) {
    return await response.status(200).json({user: view.render('user/index')})
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try{
      const data = await request.only(['username', 'email', 'password'])
      const user = await User.create(data)

      return response.status(200).json({Created: true, User: user})
    }catch{
      return response.status(404).json({Created: false})
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id);

    return response.status(200).json({User: user})
  }

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response}: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['email', 'username', 'password'])

    try{
      user.merge(data)
      await user.save()
      return response.status(200).json({updated: true, User: user.username})
    }catch{
      return response.status(400).json({Error: "Error to update user datas"})
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const  user = await User.findOrFail(params.id)

    try{
      user.delete()
      return response.status(200).json({Deleted: true})
    }catch(err){
      return response.status(err).json({Error: 'Error on delete'})
    }
  }
}
