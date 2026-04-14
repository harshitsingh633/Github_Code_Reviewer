import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_PASSWORD as string;

export const authMiddleware = (
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message : "Unauthorized"
            })
        }
        
        const decoded = jwt.verify(token , JWT_SECRET) as { userId : number};

        (req as any).userId = decoded.userId;

        next();
    }catch(e){
        return res.status(401).json({
            message : "Invalid token"
        })
    }
}