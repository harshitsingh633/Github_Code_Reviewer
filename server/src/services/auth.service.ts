import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import jwt from "jsonwebtoken";
import axios from "axios";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_PASSWORD as string;

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  return user;
};

export const findUser = async (email : string , password : string) => {
    const user = await prisma.user.findUnique({
        where : { email },
    });

    if(!user){
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password , user.password as string);

    if(!isPasswordValid){
        return null;
    }

    return user;
}

export const githubCallback = async (req : Request , res : Response) => {
    const code = req.query.code as string;

    console.log("Code",code);
    try{
        const tokenRes = await axios.post(
            "https://github.com/login/oauth/access_token",{
                client_id : process.env.GITHUB_CLIENT_ID,
                client_secret : process.env.GITHUB_CLIENT_SECRET,
                code : code
            },
            {
                headers : {
                    Accept : "application/json"
                }
            }
        );

        const access_token = tokenRes.data.access_token;

        console.log("Token Response" , tokenRes.data);

        const userRes = await axios.get("https://api.github.com/user",{
            headers : {
                Authorization : `Bearer ${access_token}`
            }
        });

        const githubUser = userRes.data;

        let user = await prisma.user.findUnique({
          where : {
            githubId : String(githubUser.id)
          }
        });

        if(!user){
          user = await prisma.user.create({
            data :{
              email : githubUser.email || `${githubUser.login}@github.com`,
              githubId : String(githubUser.id),
              accessToken : access_token
            }
          });
        }
        else{
          user = await prisma.user.update({
            where : { id : user.id},
            data : { accessToken : access_token }
          });
        }

        const token = jwt.sign(
          { userId : user.id},
          JWT_SECRET,
          {expiresIn : "7d"}
        )
        res.cookie("token",token , {
          httpOnly : true,
          secure : false,
          sameSite : "lax",
          path : '/'
        })

      return res.send("Github login Successful")
    }catch(e){
      console.error(e)
      res.status(500).json({ message : "Github auth failed"});
    }
}

export const getRepos = async (req : Request , res : Response) => {
    try{
      const user = await prisma.user.findUnique({
        where : { id : (req as any).userId }
      });

      if(!user || !user.accessToken){
        return res.status(400).json({
          message : "Github not connected"
        });
      }

      const repos = await axios.get(
        "https://api.github.com/user/repos",
      {
        headers: {
          Authorization : `Bearer ${user.accessToken}`
        }
      }
      );
      return res.json(repos.data);
    }catch(e){
      console.error(e);
      return res.status(500).json({
        message : "Failed to fetch repos"
      })
    }
}