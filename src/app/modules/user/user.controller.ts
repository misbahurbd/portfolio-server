import { catchAsync } from "../../../utils/catch-async"
import { sendResponse } from "../../../utils/send-response"
import { userService } from "./user.services"

const getMe = catchAsync(async (req, res) => {
  const user = req.user

  const result = await userService.getMe(user.id)
  sendResponse(res, {
    data: result,
    message: "Current user retrived successfully!",
  })
})

export const userController = {
  getMe,
}
