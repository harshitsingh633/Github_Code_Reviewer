import { email, z } from "zod";

export const signupSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8)
})

export const signinSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8)
})

export type SignInInput = z.infer<typeof signinSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
