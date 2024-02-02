import { Request, Response, NextFunction } from 'express'
import { ZodTypeAny } from 'zod'

export const validateBodyMiddleware =
  (schema: ZodTypeAny) =>
  (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Response | void => {
    console.log('paso 1')
    const validatedBody = schema.parse(request.body)
    console.log('paso 2')
    request.body = validatedBody

    return next()
  }

export default { validateBodyMiddleware }
