/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthService, Decoded } from '@/services/auth-service'
import { Role } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

export class AuthorizationMiddleware {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization
    if (!authToken) {
      return res.status(401).json({
        message: 'invalid token',
      })
    }

    const decoded: Decoded = await AuthService.validateToken(authToken)
    res.locals.userId = decoded.sub
    res.locals.userRole = decoded.role
    next()
  }

  static verifyOwner(roleToVerify: Role = Role.USER) {
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
}
