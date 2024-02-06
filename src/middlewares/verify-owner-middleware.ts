import { Role } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

export const verifyOwnerMiddleware = (roleToVerify: Role = Role.USER) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idParam: string = req.params.id
      const idUser: string = res.locals.userId
      const role: Role = res.locals.userRole

      if (role === Role.ADMIN) {
        return next()
      }

      if (role !== roleToVerify || idParam !== idUser) {
        return res.status(403).json('Unauthorized')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}
