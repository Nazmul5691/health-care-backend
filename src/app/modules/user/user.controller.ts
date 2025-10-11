import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createPatient(req);

    // console.log(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'patient created successfully',
        data: result
    })

})


const createAdmin = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createAdmin(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Admin Created successfuly!",
        data: result
    })
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createDoctor(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Doctor Created successfuly!",
        data: result
    })
});


const getAllUsers = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["status", "role", "email", "searchTerm"])
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])

    // const { page, limit, searchTerm, sortBy, sortOrder, role, status } = req.query;
    // const result = await UserService.getAllUsers({ page: Number(page), limit: Number(limit), searchTerm, sortBy, sortOrder, role, status });

    const result = await UserService.getAllUsers(filters, options);

    // console.log(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User retrieved successfully',
        meta: result.meta,
        data: result.data
    })

})



export const UserController = {
    createPatient,
    getAllUsers,
    createAdmin,
    createDoctor
}