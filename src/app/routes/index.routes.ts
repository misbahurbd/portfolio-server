import express, { Router } from "express"
import { authRoutes } from "../modules/auth/auth.routes"
import { userRoutes } from "../modules/user/user.routes"
import { uploadRoutes } from "../modules/upload/upload.routes"
import { blogRoutes } from "../modules/blog/blog.routes"
import { projectRoutes } from "../modules/project/project.routes"
import { educationRoutes } from "../modules/education/education.routes"

const router = express.Router()

const routers: { path: string; router: Router }[] = [
  {
    path: "/auth",
    router: authRoutes,
  },
  {
    path: "/users",
    router: userRoutes,
  },
  {
    path: "/upload",
    router: uploadRoutes,
  },
  {
    path: "/blogs",
    router: blogRoutes,
  },
  {
    path: "/projects",
    router: projectRoutes,
  },
  {
    path: "/educations",
    router: educationRoutes,
  },
]

routers.forEach(route => {
  router.use(route.path, route.router)
})

export const moduleRoutesd = router
