import { AppError } from '@/errors/AppError'
import {
  CreateUser,
  UpdateUser,
  UserWithoutPassword,
} from '@/interfaces/users-interfaces-schema'
import { UsersRepository } from '@/repositories/user-repository'
import { ResCreateUserSchema } from '@/schemas/user-schema'
import { hashSync } from 'bcryptjs'

export class UserService {
  constructor(private userRepository: UsersRepository) {}

  hashPassword = async (password: string): Promise<string> => {
    return hashSync(password, 10)
  }

  create = async (payload: CreateUser): Promise<UserWithoutPassword> => {
    const email = await this.userRepository.findByEmail(payload.email)

    if (email) {
      throw new AppError('Email already exists', 409)
    }

    const hashedPassword = await this.hashPassword(payload.email)

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

  async findAll() {
    return await this.userRepository.findAll()
  }

  async update(id: string, updateUserDto: UpdateUser) {
    await this.findById(id)

    const updatedUser = await this.userRepository.update(id, updateUserDto)

    return updatedUser
  }

  async delete(id: string) {
    await this.findById(id)

    await this.userRepository.delete(id)
  }
}
