import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

export const validateBodyMiddleware =
  (schema: ZodTypeAny) =>
  (
    request: Request,
    response: Response,
    next: NextFunction
  ): Response | void => {
    const validatedBody = schema.parse(request.body);

    request.body = validatedBody;

    return next();
  };

export default { validateBodyMiddleware };
