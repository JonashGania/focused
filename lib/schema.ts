import { z } from "zod";

export const RegisterSchema = z.object({
  firstName: z.string().min(1, "Please input your name"),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters"),
});
