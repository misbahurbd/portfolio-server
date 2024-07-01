import express from "express"
import { checkAuth } from "../../middlewares/check-auth"
import { validateRequest } from "../../middlewares/validate-request"
import { experienceValidation } from "./experience.validations"
import { experienceController } from "./experience.controller"

const router = express.Router()

router.post(
  "/",
  checkAuth(),
  validateRequest(experienceValidation.experienceSchema),
  experienceController.createExperience
)

router.get("/", experienceController.getExperiences)
router.get("/:id", experienceController.getExperience)

router.put(
  "/:id",
  checkAuth(),
  validateRequest(experienceValidation.experienceSchema),
  experienceController.updateExperience
)

router.delete("/:id", checkAuth(), experienceController.deleteExperience)

export const experienceRoutes = router
