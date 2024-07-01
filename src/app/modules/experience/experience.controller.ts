import { catchAsync } from "../../../utils/catch-async"
import { pickQueryTerms } from "../../../utils/pick-query"
import { sendResponse } from "../../../utils/send-response"
import { experienceQueryFields } from "./experience.constant"

import { experienceService } from "./experience.service"

const createExperience = catchAsync(async (req, res) => {
  const result = await experienceService.createExperience(req.body)

  sendResponse(res, {
    message: "Experience created successfully!",
    data: result,
  })
})

const getExperiences = catchAsync(async (req, res) => {
  const query = pickQueryTerms(req.query, experienceQueryFields)
  const options = pickQueryTerms(req.query, [
    "limit",
    "page",
    "sortBy",
    "sortOrder",
  ])

  const result = await experienceService.getExperiences(query, options)

  sendResponse(res, {
    message: "Experience data retrieved successfully",
    meta: result.meta,
    data: result.data,
  })
})

const getExperience = catchAsync(async (req, res) => {
  const result = await experienceService.getExperience(req.params.id)

  sendResponse(res, {
    message: "Experience data retrived successfully!",
    data: result,
  })
})

const updateExperience = catchAsync(async (req, res) => {
  const result = await experienceService.updateExperience(
    req.params.id,
    req.body
  )

  sendResponse(res, {
    message: "Experience data update successfully!",
    data: result,
  })
})

const deleteExperience = catchAsync(async (req, res) => {
  await experienceService.deleteExperience(req.params.id)

  sendResponse(res, {
    message: "Experience delete successfully!",
    data: null,
  })
})

export const experienceController = {
  createExperience,
  getExperiences,
  getExperience,
  updateExperience,
  deleteExperience,
}
