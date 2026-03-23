import bcrypt from "bcrypt";
import { prisma } from "../utils/prisma";


export const createUser = async (email : string , password : string) =>{
    const hashedPassword = await bcrypt.hash(password , 10);

    const user = prisma.user.create({
        data : {
            email,
            password : hashedPassword
        }
    });

    return user;
}

export const findUser = async (email : string , password : string) => {
    const user = await prisma.user.findUnique({
        where : { email },
    });

    if(!user){
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!isPasswordValid){
        throw new Error("Invalid password");
    }

    return user;
}