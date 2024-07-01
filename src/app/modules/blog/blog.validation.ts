import { z } from "zod"

const createBlogSchema = z.object({
  title: z.string().min(1, "Blog title is required"),
  content: z.string().min(1, "Blog content is required"),
  featurePhoto: z.string().min(1, "Feature image is required"),
  category: z.string().min(1, "Blog category is required"),
  metadata: z.object({
    title: z.string().min(1, "SEO title is required"),
    description: z.string().min(1, "SEO description is required"),
    socialImg: z.string().optional(),
  }),
})

export const blogValidation = {
  createBlogSchema,
}
