import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/memory/in-memory-users-repository'
import { UserService } from '@/services/users-service'
import { AuthService } from './auth-service'
import { CreateUser } from '@/interfaces/users-interfaces-schema'
import { AppError } from '@/errors/AppError'

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
    const createUser: CreateUser = {
      username: 'test',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'test@mail.com',
      password: '123456',
    }

    await userService.create(createUser)

    const token = await authService.createToken({
      email: createUser.email,
      password: createUser.password,
    })

    expect(token).toEqual(expect.any(String))
  })

  it('should be able to decode a token', async () => {
    const createUser: CreateUser = {
      username: 'John Doe',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'test@mail.com',
      password: '123456',
    }

    await userService.create(createUser)

    const token = await authService.createToken({
      email: createUser.email,
      password: createUser.password,
    })

    const bearerToken = `Bearer ${token}`
    const decoded = await AuthService.validateToken(bearerToken)

    expect(decoded).toEqual({
      username: 'John Doe',
      role: 'USER',
      iat: expect.any(Number),
      exp: expect.any(Number),
      sub: expect.any(String),
    })
  })

  it('should reject with AppError when authToken is missing or too short', async () => {
    const bearerToken = `Bearer`
    try {
      await AuthService.validateToken(bearerToken)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('hould reject with AppError when authToken is exactly 7 characters long', async () => {
    const bearerToken = `Bearer123`
    try {
      await AuthService.validateToken(bearerToken)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
