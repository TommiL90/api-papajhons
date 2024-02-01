import { test, expect, describe, it, beforeEach } from 'vitest'
import { UserService } from './users-service'
import { compareSync } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/memory/in-memory-users-repository'
import { AppError } from '@/errors/AppError'

let userRepository: InMemoryUsersRepository
let userService: UserService
describe('Auth service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    userService = new UserService(userRepository)
  })
  it('should be able to yo hash user password upon registration', async () => {
    const password = '123456'
    const hashedPassword = await userService.hashPassword(password)

    const isPasswordCorrectlyHashed = compareSync(password, hashedPassword)

    expect(hashedPassword).not.toBe(password)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it('should be able to register a user', async () => {
    const user = await userService.create({
      name: 'test',
      email: 'test@mail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user).toBeDefined()
    expect(user.name).toBe('test')
    expect(user.email).toBe('test@mail.com')
  })

  it('should not be able to register with same email twice', async () => {
    await userService.create({
      name: 'test',
      email: 'test@mail.com',
      password: '123456',
    })

    try {
      await userService.create({
        name: 'test',
        email: 'test@mail.com',
        password: '123456',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
