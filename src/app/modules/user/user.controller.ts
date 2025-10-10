import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createPatient = catchAsync(async(req:Request, res: Response) =>{
    const result = await UserService.createPatient(req);

    // console.log(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'patient created successfully',
        data: result
    })

})



const getAllUsers = catchAsync(async(req:Request, res: Response) =>{

    const {page, limit} = req.query;
    const result = await UserService.getAllUsers({ page: Number(page), limit: Number(limit)});

    // console.log(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User retrieved successfully',
        data: result
    })

})



export const UserController = {
    createPatient,
    getAllUsers
}