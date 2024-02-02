import {
  TCheckInSchema,
  TCheckInUncheckedCreateSchema,
} from '@/interfaces/check-in-interfaces'

export interface CheckInsRepository {
  findById(id: string): Promise<TCheckInSchema | null>
  create(data: TCheckInUncheckedCreateSchema): Promise<TCheckInSchema>
  findManyByUserId(userId: string, page: number): Promise<TCheckInSchema[]>
  countByUserId(userId: string): Promise<number>
  findByUserIdOnDate(userId: string, date: Date): Promise<TCheckInSchema | null>
  save(checkIn: TCheckInSchema): Promise<TCheckInSchema>
}
