import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {

  public async login({ auth, request, response }: HttpContextContract){
    const email = request.input('email')
    const password = request.input('password')

    const user = await User.findByOrFail('email', email)

    try{
      const token = await auth.use('api').attempt(email, password)
      return response.status(200).json({token: token, user: [user.username, user.email]})
    }catch{
      return response.status(401).json({Error: 'Invalid credential'})
    }
  }
}
