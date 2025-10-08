
import { prisma } from "../../shared/prisma";
import { UserStatus } from "@prisma/client";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const login = async (payload: {email: string, password: string}) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })


    const password = await bcrypt.compare(payload.password, user.password)

    if(!password){
        throw new Error("Password is incorrect")
    }


    const accessToken = jwt.sign({email: user.email, role: user.role}, "abcd", {
        algorithm: "HS256",
        expiresIn: "1h"
    })
    
    const refreshToken = jwt.sign({email: user.email, role: user.role}, "abcd", {
        algorithm: "HS256",
        expiresIn: "1h"
    })


    return {
        accessToken,
        refreshToken
    };
}



export const AuthService = {
    login
}