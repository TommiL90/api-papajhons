import { expect, describe, it, beforeEach } from 'vitest'
import { UserService } from './users-service'
import { compareSync } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/memory/in-memory-users-repository'
import { AppError } from '@/errors/AppError'
import {
  UpdateUser,
  UserWithoutPassword,
} from '@/interfaces/users-interfaces-schema'

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

  it('should be able to get a user profile', async () => {
    const user = await userService.create({
      name: 'test',
      email: 'test@mail.com',
      password: '123456',
    })

    const profile = await userService.findById(user.id)

    expect(profile.name).toEqual('test')
  })

  it('should not be able to get a user profile with invalid id', async () => {
    try {
      await userService.findById('invalidId')
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be able to return an array of users', async () => {
    const result = await userService.findAll()

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })

  it('should be able return a user by ID', async () => {
    const createdUser = await userService.create({
      name: 'test',
      email: 'test@mail.com',
      password: '123456',
    })

    const result = await userService.findById(createdUser.id)

    expect(result.id).toEqual(createdUser.id)
  })

  it('should throw a AppError when an invalid ID is provided', async () => {
    const taskId = 'invalidId'

    try {
      await userService.findById(taskId)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be able update a user', async () => {
    const createdUser = await userService.create({
      name: 'test',
      email: 'test@mail.com',
      password: '123456',
    })

    const userId = createdUser.id
    const updateUser: UpdateUser = {
      ...createdUser,
      name: 'new name',
    }

    const res = await userService.update(userId, updateUser)

    expect(res.id).toEqual(userId)
    expect(res.name).toEqual('new name')
  })

  it('should not be able update a inexistent user', async () => {
    const categoryId = 'invalidId'

    try {
      await userService.update(categoryId, { name: 'Test 2' })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
  it('should be able delete a user', async () => {
    const res: UserWithoutPassword = await userService.create({
      name: 'test',
      email: 'test@mail.com',
      password: '123456',
    })
    const userId = res.id

    await userService.delete(userId)

    try {
      await userService.findById(userId)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should not be able to delete a inexistent category', async () => {
    const categoryId = 'invalidId'
    try {
      await userService.delete(categoryId)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
