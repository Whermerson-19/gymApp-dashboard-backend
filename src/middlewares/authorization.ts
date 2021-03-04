import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";
import AppError from "../errors/AppError";

import authConfig from "../config/auth";

interface IPayload {
  sub: string;
  iat: number;
  exp: number;
}

export default function (
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeaders = request.headers.authorization;
  if (!authHeaders) throw new AppError("JWT Token is missing!", 401);

  const [, token] = authHeaders.split(" ");

  const verifyToken = verify(token, authConfig.jwt.secret);
  if (!verifyToken) throw new AppError("Ivalid token", 401);

  const { sub } = verifyToken as IPayload;

  request.user = {
    id: sub,
  };

  return next();
}
