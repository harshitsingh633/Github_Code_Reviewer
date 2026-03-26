import { Request, Response } from "express";
import { signinSchema, signupSchema }  from "../schemas/auth.schema"
import { createUser, findUser } from "../services/auth.service";
import jwt from 'jsonwebtoken';
import "dotenv/config";



const JWT_SECRET = process.env.JWT_PASSWORD as string;

if(!JWT_SECRET){
    throw new Error("JWT_SECRET not defined");
}

export const signup = async (req : Request , res : Response) => {
    try{
        const parsed = signupSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({
                error : parsed.error.format()
            });
        }

        const { email , password } = parsed.data;
        const user = await createUser(email , password);

        res.json({
            message : "User created"
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            error: "Server error"
        })
    }
}

export const signin = async (req : Request, res : Response) => {
    try{
        const parsed = signinSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({
                error : parsed.error.format()
            })
        }

        const { email , password} = parsed.data;
        const user = await findUser(email , password);

        if(!user){
            return res.status(401).json({
                message : "Invalid credentials"
            })
        }

        const token = jwt.sign({
            userId : user.id
        },JWT_SECRET, {expiresIn : "7d"})
        
        res.cookie("token", token , { 
            httpOnly : true,
            secure : false,
            sameSite: "lax"
        })

        return res.json({
            message : "Logged in successfully"
        });

    }catch(e){
        res.status(500).json({
            error : "Server error"
        })
    }
}