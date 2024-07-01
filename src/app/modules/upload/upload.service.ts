import config from "../../../config"
import { v2 as cloudinary, UploadApiOptions } from "cloudinary"

const uploadImage = async (imageSrc: string) => {
  cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
  })

  const options: UploadApiOptions = {
    folder: "products",
  }
  const result = await cloudinary.uploader.upload(imageSrc, options)

  return result
}

export const uploadService = {
  uploadImage,
}
