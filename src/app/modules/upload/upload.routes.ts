import express from "express"
import { checkAuth } from "../../middlewares/check-auth"
import { upload } from "../../middlewares/multer"
import { uploadController } from "./upload.controller"

const router = express.Router()

router.post(
  "/",
  checkAuth(),
  upload.single("file"),
  uploadController.uploadImage
)

export const uploadRoutes = router
