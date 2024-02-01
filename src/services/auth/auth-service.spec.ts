import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/memory/in-memory-users-repository'
import { UserService } from '@/services/user/users-service'
import { AuthService } from './auth-service'
import { TCreateUser } from '@/interfaces/user.interfaces'

let userRepository: InMemoryUsersRepository
let userService: UserService
let authService: AuthService
describe('Auth service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    userService = new UserService(userRepository)
    authService = new AuthService(userRepository)
  })
  it('should be able to authenticate a user', async () => {
    const createUser: TCreateUser = {
      name: 'John Doe',
      email: 'test@gmail.com',
      password: 'hashedPassword',
    }

    await userService.create(createUser)

    const token = await authService.login({
      email: createUser.email,
      password: createUser.password,
    })

    expect(token).toEqual(expect.any(String))
  })
})
