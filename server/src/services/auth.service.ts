import { PrismaClient } from "@prisma/client";
import axios from "axios";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
const prisma = new PrismaClient();

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

    try{
        const tokenRes = await axios.post(
            "https://github.com/login/oauth/access_token",{
                client_id : process.env.GITHUB_CLIENT_ID,
                client_secret : process.env.GITHUB_CLIENT_SECRET,
                code
            },
            {
                headers : {
                    Accept : "application/json"
                }
            }
        );

        const access_token = tokenRes.data.access_token;

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
              githubId : String(githubUser.id)
            }
          });
          res.redirect("https://localhost:5173/dashboard");
        }

    }catch(e){
      console.error(e)
      res.status(500).json({ message : "Github auth failed"});
    }
}