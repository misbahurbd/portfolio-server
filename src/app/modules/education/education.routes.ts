import express from "express"
import { checkAuth } from "../../middlewares/check-auth"
import { validateRequest } from "../../middlewares/validate-request"
import { educationValidation } from "./education.validations"
import { educationController } from "./education.controller"

const router = express.Router()

router.post(
  "/",
  checkAuth(),
  validateRequest(educationValidation.createEducationSchema),
  educationController.createEducation
)

router.get("/", educationController.getEducations)

export const educationRoutes = router
