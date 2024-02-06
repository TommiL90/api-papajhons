/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@/env'
import { AppError } from '@/errors/AppError'
import { AuthUser } from '@/interfaces/users-interfaces-schema'
import { UsersRepository } from '@/repositories/user-repository'
import { compare } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'

export interface Decoded {
  userName: string
  role: string
  iat: number
  exp: number
  sub: string
}
export class AuthService {
  constructor(private userRepository: UsersRepository) {}

  createToken = async (payload: AuthUser): Promise<string> => {
    const user = await this.userRepository.findByEmailForAuth(payload.email)

    if (!user) {
      throw new AppError('Invalid credentials', 403)
    }
    console.log(user.password, payload.password)
    const passwordMatch = await compare(payload.password, user.password)
    console.log(passwordMatch)
    if (!passwordMatch) {
      throw new AppError('Invalid credentials', 403)
    }

    const token = sign(
      { username: user.username, role: user.role },
      env.SECRET_KEY,
      {
        expiresIn: '1h',
        subject: user.id,
      },
    )

    return token
  }

  static validateToken(authToken: string): Promise<Decoded> {
    return new Promise((resolve, reject) => {
      if (!authToken || authToken.length < 7) {
        reject(new AppError('Missing bearer token', 401))
      }

      const token: string = authToken.split(' ')[1]
      verify(token, env.SECRET_KEY, (error: any, decoded: any) => {
        if (error) {
          reject(new AppError(error.message, 401))
        }

        resolve(decoded)
      })
    })
  }
}
