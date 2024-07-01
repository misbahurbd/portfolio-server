import { JwtPayload } from "jsonwebtoken"
import httpStatus from "http-status"
import bcrypt from "bcrypt"
import { IChangePassword, IUserLogin } from "./auth.interface"
import prisma from "../../../utils/prisma-client"
import { AppError } from "../../errors/app-error"
import config from "../../../config"
import { generateToken, verifyToken } from "../../../helpers/jwt-helper"

const userLogin = async (credentials: IUserLogin) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: credentials.username.toLowerCase(),
        },
        {
          username: credentials.username.toLowerCase(),
        },
      ],
    },
  })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  const isPasswordValid = await bcrypt.compare(
    credentials.password,
    user.password
  )

  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials")
  }

  const jwtpayload = {
    id: user.id,
  }
  const accessToken = generateToken(
    jwtpayload,
    config.secret.accessSecret!,
    "1d"
  )
  const refreshToken = generateToken(
    jwtpayload,
    config.secret.refreshSecret!,
    "7d"
  )

  return {
    user,
    accessToken,
    refreshToken,
  }
}

const changePassword = async (
  currentUser: JwtPayload,
  payload: IChangePassword
) => {
  const user = await prisma.user.findFirst({
    where: {
      id: currentUser.id,
    },
  })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  const isPasswordValid = await bcrypt.compare(
    payload.oldPassword,
    user.password
  )

  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Wrong password")
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.hashRound)
  )

  const result = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      password: hashedPassword,
    },
  })

  return result
}

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "refresh token missing!")
  }

  const user = await verifyToken(token, config.secret.refreshSecret!)

  if (!user || !user.id) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized")
  }

  const jwtpayload = {
    id: user.id,
  }

  const accessToken = generateToken(
    jwtpayload,
    config.secret.accessSecret!,
    "1d"
  )
  const refreshToken = generateToken(
    jwtpayload,
    config.secret.refreshSecret!,
    "7d"
  )

  return {
    user,
    accessToken,
    refreshToken,
  }
}

export const authService = {
  userLogin,
  changePassword,
  refreshToken,
}
