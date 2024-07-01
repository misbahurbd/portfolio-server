import { catchAsync } from "../../../utils/catch-async"
import { pickQueryTerms } from "../../../utils/pick-query"
import { sendResponse } from "../../../utils/send-response"
import { educationQueryFields } from "./education.constant"
import { educationService } from "./education.service"

const createEducation = catchAsync(async (req, res) => {
  const result = await educationService.createEducation(req.body)

  sendResponse(res, {
    message: "Education created successfully!",
    data: result,
  })
})

const getEducations = catchAsync(async (req, res) => {
  const query = pickQueryTerms(req.query, educationQueryFields)
  const options = pickQueryTerms(req.query, [
    "limit",
    "page",
    "sortBy",
    "sortOrder",
  ])

  const result = await educationService.getEducations(query, options)

  sendResponse(res, {
    message: "Educations data retrieved successfully",
    meta: result.meta,
    data: result.data,
  })
})

export const educationController = {
  createEducation,
  getEducations,
}
