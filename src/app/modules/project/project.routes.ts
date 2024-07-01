import express from "express"
import { validateRequest } from "../../middlewares/validate-request"
import { projectValidation } from "./project.validation"
import { checkAuth } from "../../middlewares/check-auth"
import { projectController } from "./project.controller"

const router = express.Router()

router.post(
  "/",
  checkAuth(),
  validateRequest(projectValidation.createProjectSchema),
  projectController.createProject
)

router.get("/", projectController.getProjects)
router.get("/:id", projectController.getProduct)

router.put(
  "/:id",
  validateRequest(projectValidation.createProjectSchema),
  projectController.updateProject
)

router.delete("/:id", projectController.deleteProject)

export const projectRoutes = router
