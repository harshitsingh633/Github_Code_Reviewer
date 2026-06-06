import { email, z } from "zod";

export const signupSchema = z.object({
    email : z.email(),
    password : z.string().min(8)
})

export const signinSchema = z.object({
    email : z.string().max(25).min(6),
    password : z.string().min(8)
})
