import { z } from "zod"

export const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string({ required_error: "Start date is required" }),
  endDate: z.string({ required_error: "End date is required" }),
  description: z.string().min(1, "Description is required"),
})

export const experienceValidation = {
  experienceSchema,
}
