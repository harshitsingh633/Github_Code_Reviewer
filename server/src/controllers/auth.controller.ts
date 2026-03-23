import { Request, Response } from "express";
import { signinSchema, signupSchema }  from "../schemas/auth.schema"
import { createUser, findUser } from "../services/auth.service";
import jwt from 'jsonwebtoken';
import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
const app = express();

app.use(cookieParser());
app.use(express.json());

const JWT_SECRET = process.env.JWT_PASSWORD as string;

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
            message : "User created",
            user
        })
    }catch(e){
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
            res.status(500).json({
                message : "User does not exist"
            })
        }

        const token = jwt.sign({
            userId : user.id
        },JWT_SECRET)
        return token;
    }catch(e){
        res.status(500).json({
            error : "Server error"
        })
    }
}