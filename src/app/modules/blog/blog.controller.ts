import { catchAsync } from "../../../utils/catch-async"
import { pickQueryTerms } from "../../../utils/pick-query"
import { sendResponse } from "../../../utils/send-response"
import { blogQueryFields } from "./blog.constant"
import { blogService } from "./blog.service"

const createBlog = catchAsync(async (req, res) => {
  const result = await blogService.createBlog(req.body)

  sendResponse(res, {
    message: "Blog create successfully!",
    data: result,
  })
})

const getBlogs = catchAsync(async (req, res) => {
  const query = pickQueryTerms(req.query, blogQueryFields)
  const options = pickQueryTerms(req.query, [
    "limit",
    "page",
    "sortBy",
    "sortOrder",
  ])

  const result = await blogService.getBlogs(query, options)

  sendResponse(res, {
    message: "Blogs data retrieved successfully",
    meta: result.meta,
    data: result.data,
  })
})

const getBlog = catchAsync(async (req, res) => {
  const result = await blogService.getBlog(req.params.id)

  sendResponse(res, {
    message: "Blog data retrieved successfully!",
    data: result,
  })
})

const updateBlog = catchAsync(async (req, res) => {
  const result = await blogService.updateBlog(req.params.id, req.body)

  sendResponse(res, {
    message: "Blog data update successfully!",
    data: result,
  })
})

const deleteBlog = catchAsync(async (req, res) => {
  await blogService.deleteBlog(req.params.id)

  sendResponse(res, {
    message: "Blog delete successfully!",
    data: null,
  })
})

export const blogController = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
}
