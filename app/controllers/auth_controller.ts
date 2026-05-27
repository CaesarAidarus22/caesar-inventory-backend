import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

  // REGISTER ADMIN
  async register({ request, response }: HttpContext) {

    const data = request.only([
      'email',
      'password',
    ])

    const user = await User.create({
      email: data.email,
      password: await hash.make(data.password),
    })

    return response.json({
      message: 'Admin registered successfully',
      user,
    })

  }

  // LOGIN ADMIN
  async login({ request, response }: HttpContext) {

    const { email, password } = request.only([
      'email',
      'password',
    ])

    const user = await User.findBy('email', email)

    if (!user) {
      return response.status(401).json({
        message: 'Invalid credentials',
      })
    }

    const isPasswordValid = await hash.verify(
      user.password,
      password
    )

    if (!isPasswordValid) {
      return response.status(401).json({
        message: 'Invalid credentials',
      })
    }

    const token = await User.accessTokens.create(user)

    return response.json({
      message: 'Login successful',
      token: token.value!.release(),
      user,
    })

  }

}