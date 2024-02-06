import { AuthService, Decoded } from '@/services/auth-service'
import { NextFunction, Request, Response } from 'express'

export const verifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
