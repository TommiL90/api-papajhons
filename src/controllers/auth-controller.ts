import { makeAuthUserService } from '@/services/factories/make-auth-service'
import { Request, Response } from 'express'

export class AuthController {
  authorize = async (req: Request, res: Response) => {
    const authService = makeAuthUserService()

    const token: string = await authService(req.body)

    return res.status(200).json({ token })
  }
}
