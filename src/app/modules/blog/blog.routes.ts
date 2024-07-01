import express from "express"
import { validateRequest } from "../../middlewares/validate-request"
import { blogValidation } from "./blog.validation"
import { checkAuth } from "../../middlewares/check-auth"
import { blogController } from "./blog.controller"

const router = express.Router()

router.post(
  "/",
  checkAuth(),
  validateRequest(blogValidation.createBlogSchema),
  blogController.createBlog
)

router.get("/", blogController.getBlogs)

export const blogRoutes = router
