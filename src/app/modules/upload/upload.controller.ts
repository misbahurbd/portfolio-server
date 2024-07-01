import httpStatus from "http-status"
import { catchAsync } from "../../../utils/catch-async"
import { AppError } from "../../errors/app-error"
import { uploadService } from "./upload.service"
import { sendResponse } from "../../../utils/send-response"

const uploadImage = catchAsync(async (req, res) => {
  if (!req.file || !req.file.buffer) {
    throw new AppError(httpStatus.BAD_REQUEST, "Please upload an image")
  }
  const b64 = Buffer.from(req.file.buffer).toString("base64")
  const dataURI = "data:" + req.file.mimetype + ";base64," + b64

  const result = await uploadService.uploadImage(dataURI)

  sendResponse(res, {
    message: "Image upload successfully!",
    data: result,
  })
})

export const uploadController = {
  uploadImage,
}
