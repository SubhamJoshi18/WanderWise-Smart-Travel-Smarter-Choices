
import { z } from "zod";
const forgetPasswordSchema = z.object({
  email : z.string().email('Invalid Email Address'),
})

const resetPasswordSchema = z.object({
  password: z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must be at most 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character"),
})

export {forgetPasswordSchema,resetPasswordSchema}