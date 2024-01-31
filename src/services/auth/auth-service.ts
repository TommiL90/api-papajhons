import { env } from '@/env'
import { AppError } from '@/errors/AppError'
import { TLogin } from '@/interfaces/user.interfaces'
import { UserRepository } from '@/repositories/users-repository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  login = async (payload: TLogin): Promise<string> => {
    const user = await this.userRepository.findByEmailForAuth(payload.email)

    if (!user) {
      throw new AppError('Invalid credentials', 403)
    }

    const pwdMatch: boolean = await compare(payload.password, user.password)

    if (!pwdMatch) {
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
