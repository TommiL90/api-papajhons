import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

const validateTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authToken = req.headers.authorization;

  if (!authToken || authToken.length < 7) {
    throw new AppError("Missing bearer token", 401);
  }
  const token: string = authToken.split(" ")[1];

  return verify(
    token,
    String(process.env.SECRET_KEY!),
    (error: any, decoded: any) => {
      if (error) {
        throw new AppError(error.message, 401);
      }
      
      res.locals.userId = Number(decoded.sub);
      
      return next();
    }
  );
};

const verifyOwnerMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const idParam: number = Number(req.params.id);
    const idUser: number = res.locals.userId;
  console.log(idUser)
  console.log(idParam)
    if (idParam !== idUser) {
      throw new AppError("not authorized", 403);
    }
  
    next();
  };

export default {validateTokenMiddleware, verifyOwnerMiddleware}