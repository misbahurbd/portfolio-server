import express from "express"
import { authController } from "./auth.controller"
import { validateRequest } from "../../middlewares/validate-request"
import { authValidation } from "./auth.validation"
import { reqLimiter } from "../../middlewares/rate-limiter"
import { checkAuth } from "../../middlewares/check-auth"

const router = express.Router()

router.post(
  "/login",
  reqLimiter(10),
  validateRequest(authValidation.loginSchema),
  authController.userLogin
)

router.post("/refresh-token", authController.refreshToken)

router.put(
  "/change-password",
  checkAuth(),
  reqLimiter(5),
  validateRequest(authValidation.changePasswordSchema),
  authController.changePassword
)

export const authRoutes = router
