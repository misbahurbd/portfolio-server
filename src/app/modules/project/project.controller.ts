import { catchAsync } from "../../../utils/catch-async"
import { pickQueryTerms } from "../../../utils/pick-query"
import { sendResponse } from "../../../utils/send-response"
import { blogQueryFields } from "../blog/blog.constant"
import { projectService } from "./project.service"

const createProject = catchAsync(async (req, res) => {
  const result = await projectService.createProject(req.body)

  sendResponse(res, {
    message: "Project create successfully!",
    data: result,
  })
})

const getProjects = catchAsync(async (req, res) => {
  const query = pickQueryTerms(req.query, blogQueryFields)
  const options = pickQueryTerms(req.query, [
    "limit",
    "page",
    "sortBy",
    "sortOrder",
  ])

  const result = await projectService.getProjects(query, options)

  sendResponse(res, {
    message: "Projects data retrieved successfully",
    meta: result.meta,
    data: result.data,
  })
})

const getProduct = catchAsync(async (req, res) => {
  const result = await projectService.getProject(req.params.id)

  sendResponse(res, {
    message: "Project data retrieved successfully",
    data: result,
  })
})

const updateProject = catchAsync(async (req, res) => {
  const result = await projectService.updateProject(req.params.id, req.body)

  sendResponse(res, {
    message: "Project data updated successfully!",
    data: result,
  })
})

const deleteProject = catchAsync(async (req, res) => {
  await projectService.deleteProject(req.params.id)

  sendResponse(res, {
    message: "Project delete successfully!",
    data: null,
  })
})

export const projectController = {
  createProject,
  getProjects,
  getProduct,
  updateProject,
  deleteProject,
}
