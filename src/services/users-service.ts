import { AppError } from '@/errors/AppError'
import {
  CreateUser,
  UpdateUser,
  UserWithoutPassword,
} from '@/interfaces/users-interfaces-schema'
import { UsersRepository } from '@/repositories/user-repository'
import { ResCreateUserSchema } from '@/schemas/user-schema'
import { hash } from 'bcryptjs'

export class UserService {
  constructor(private userRepository: UsersRepository) {}

  hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await hash(password, 10)
    return hashedPassword
  }

  create = async (payload: CreateUser): Promise<UserWithoutPassword> => {
    const email = await this.userRepository.findByEmail(payload.email)

    if (email) {
      throw new AppError('Email already exists', 409)
    }

    const hashedPassword = await this.hashPassword(payload.password)
    console.log(hashedPassword)
    const data = await this.userRepository.create({
      ...payload,
      password: hashedPassword,
    })

    const newUser = ResCreateUserSchema.parse(data)

    return newUser
  }

  findById = async (id: string): Promise<UserWithoutPassword> => {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return ResCreateUserSchema.parse(user)
  }

  findAll = async () => {
    return await this.userRepository.findAll()
  }

  update = async (id: string, updateUserDto: UpdateUser) => {
    await this.findById(id)

    const updatedUser = await this.userRepository.update(id, updateUserDto)

    return updatedUser
  }

  delete = async (id: string) => {
    await this.findById(id)

    await this.userRepository.delete(id)
  }
}
