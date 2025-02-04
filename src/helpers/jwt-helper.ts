import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "../utils/prisma-client"
import httpStatus from "http-status"
import { AppError } from "../app/errors/app-error"

export const generateToken = (
  payload: Record<string, string | number>,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, { expiresIn })
}

export const verifyToken = async (token: string, secret: string) => {
  try {
    const decode = jwt.verify(token, secret) as JwtPayload
    if (!decode || !decode.exp)
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token")

    const user = await prisma.user.findUnique({
      where: {
        id: decode.id,
      },
    })
    if (!user)
      throw new AppError(httpStatus.UNAUTHORIZED, "You are unauthorized")

    const isTokenValid = decode.exp > Date.now() / 1000
    if (!isTokenValid) throw new AppError(httpStatus.FORBIDDEN, "Token expired")

    return {
      id: user.id,
      email: user.email,
    }
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are unauthorized")
  }
}
