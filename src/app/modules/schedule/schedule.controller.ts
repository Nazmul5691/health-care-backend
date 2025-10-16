import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";



const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
    const result = await ScheduleService.insertIntoDb(req.body);

    // console.log(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'schedule created successfully',
        data: result
    })

})




export const ScheduleController = {
    insertIntoDb,
    
}