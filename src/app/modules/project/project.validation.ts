import { z } from "zod"

const createProjectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  challenges: z.string().min(1, "Project challenges is required"),
  solutions: z.string().min(1, "Project solutions is required"),
  featurePhoto: z.string().min(1, "Feature image is required"),
  photos: z.array(z.string()).min(1, "Project photos is required"),
  skills: z.array(z.string()).min(1, "Project skills is required"),
  metadata: z.object({
    title: z.string().min(1, "SEO title is required"),
    description: z.string().min(1, "SEO description is required"),
    socialImg: z.string().optional(),
  }),
})

export const projectValidation = {
  createProjectSchema,
}
