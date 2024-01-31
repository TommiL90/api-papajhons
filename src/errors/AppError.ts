import { Request, Response } from 'express'
import { ZodError } from 'zod'

export class AppError extends Error {
  statusCode: number
  message: string

  constructor(message: string, statusCode = 400) {
    super()
    this.message = message
    this.statusCode = statusCode
  }
}

export const errorHandler = (err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.flatten().fieldErrors })
  }
  console.error(err)
  return res.status(500).json({ message: 'Internal Server Error.' })
}
