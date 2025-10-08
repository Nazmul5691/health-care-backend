
import { prisma } from "../../shared/prisma";
import { UserStatus } from "@prisma/client";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { jwtHelpers } from "../../helper/jwtHelpers";


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


    const accessToken = jwtHelpers.generateToken({email: user.email, role: user.role}, "abcd", "1h")
    
    const refreshToken = jwtHelpers.generateToken({email: user.email, role: user.role}, "abcd", "90d")


    return {
        accessToken,
        refreshToken,
        needPasswordChange: user.needPasswordChange
    };
}



export const AuthService = {
    login
}