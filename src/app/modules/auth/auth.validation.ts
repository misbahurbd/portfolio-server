import { z } from "zod"

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
})

const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, { message: "Old password is required" }),
  newPassword: z
    .string()
    .min(1, { message: "Password is required!" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/gm, {
      message:
        "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number.",
    }),
})

export const authValidation = {
  loginSchema,
  changePasswordSchema,
}
