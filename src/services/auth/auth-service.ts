import { env } from '@/env'
import { AppError } from '@/errors/AppError'
import { TLogin } from '@/interfaces/users-interfaces-schema'
import { UsersRepository } from '@/repositories/users-repository'
import { compareSync } from 'bcryptjs'

import { sign } from 'jsonwebtoken'

export class AuthService {
  constructor(private userRepository: UsersRepository) {}

  login = async (payload: TLogin): Promise<string> => {
    const user = await this.userRepository.findByEmailForAuth(payload.email)

    if (!user) {
      throw new AppError('Invalid credentials', 403)
    }

    const isPasswordCorrectlyHashed = compareSync(payload.email, user.password)

    if (!isPasswordCorrectlyHashed) {
      throw new AppError('Invalid credentials', 403)
    }

    const token = sign(
      { userName: user.name, role: user.role },
      env.SECRET_KEY,
      {
        expiresIn: '1h',
        subject: user.id,
      },
    )

    return token
  }
}
