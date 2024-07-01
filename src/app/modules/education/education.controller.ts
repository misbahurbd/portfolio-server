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

const getEducation = catchAsync(async (req, res) => {
  const result = await educationService.getEducation(req.params.id)

  sendResponse(res, {
    message: "Education data retrived successfully!",
    data: result,
  })
})

const updateEducation = catchAsync(async (req, res) => {
  const result = await educationService.updateEducation(req.params.id, req.body)

  sendResponse(res, {
    message: "Education data update successfully!",
    data: result,
  })
})

const deleteEducation = catchAsync(async (req, res) => {
  await educationService.deleteEducation(req.params.id)

  sendResponse(res, {
    message: "Education delete successfully!",
    data: null,
  })
})

export const educationController = {
  createEducation,
  getEducations,
  getEducation,
  updateEducation,
  deleteEducation,
}
