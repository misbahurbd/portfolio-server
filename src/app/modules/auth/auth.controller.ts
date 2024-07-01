import config from "../../../config"
import { catchAsync } from "../../../utils/catch-async"
import { sendResponse } from "../../../utils/send-response"
import { authService } from "./auth.service"

const userLogin = catchAsync(async (req, res) => {
  const result = await authService.userLogin(req.body)

  res.cookie("refreshToken", result.refreshToken, {
    secure: config.env === "production",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  })

  sendResponse(res, {
    statusCode: 200,
    message: "User logged in successfully",
    data: {
      accessToken: result.accessToken,
    },
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies

  const result = await authService.refreshToken(refreshToken)

  res.cookie("refreshToken", result.refreshToken, {
    secure: config.env === "production",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  })

  sendResponse(res, {
    message: "Generate new access token successfully",
    data: {
      accessToken: result.accessToken,
    },
  })
})

const changePassword = catchAsync(async (req, res) => {
  const currentUser = req.user
  const result = await authService.changePassword(currentUser, req.body)

  sendResponse(res, {
    statusCode: 200,
    message: "Password changed successfully",
    data: result,
  })
})

export const authController = {
  userLogin,
  changePassword,
  refreshToken,
}
