import express from "express"
import { checkAuth } from "../../middlewares/check-auth"
import { userController } from "./user.controller"

const router = express.Router()

router.get("/me", checkAuth(), userController.getMe)

export const userRoutes = router
