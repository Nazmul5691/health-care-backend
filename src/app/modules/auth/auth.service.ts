
import { prisma } from "../../shared/prisma";
import { UserStatus } from "@prisma/client";
import bcrypt from 'bcryptjs'


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
}



export const AuthService = {
    login
}