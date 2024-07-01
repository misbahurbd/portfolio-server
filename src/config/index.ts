import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(process.cwd(), ".env") })

export default {
  port: process.env.PORT || 4600,
  env: process.env.NODE_ENV || "development",
  hashRound: process.env.HASH_ROUND,
  clientUrl: process.env.CLIENT_URL,
  secret: {
    accessSecret: process.env.ACCESS_SECRET,
    refreshSecret: process.env.ACCESS_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
  },
  cloudinary: {
    name: process.env.CLOUD_NAME,
    apiKey: process.env.CLOUD_API_KEY,
    apiSecret: process.env.CLOUD_API_SECRET,
  },
  seed: {
    name: process.env.SEED_ADMIN_NAME,
    username: process.env.SEED_ADMIN_USERNAME,
    email: process.env.SEED_ADMIN_EMAIL,
    password: process.env.SEED_ADMIN_PASSWORD,
  },
}
