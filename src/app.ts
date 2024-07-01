import express, { Application, Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { moduleRoutesd } from "./app/routes/index.routes"
import globalErrorHandler from "./app/middlewares/global-error-handler"
import { notFoundErrorHandler } from "./app/middlewares/not-found-error-handler"
import { sendResponse } from "./utils/send-response"

// initialize express application
const app: Application = express()

// initialize parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portfolio-dashboard-sandy.vercel.app",
      "https://dashboard.misbahurbd.com",
    ],
    credentials: true,
  })
)
app.use(cookieParser())

// initial route
app.get("/", async (req: Request, res: Response) => {
  sendResponse(res, {
    message: "Welcome to Misbahur Rahman portfolio",
    data: null,
  })
})

// initialize application routes
app.use("/api/v1", moduleRoutesd)

// not found handler
app.use(notFoundErrorHandler)

// global error handler
app.use(globalErrorHandler)

export default app
