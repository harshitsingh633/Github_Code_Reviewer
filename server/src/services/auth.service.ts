import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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