import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { RiderService } from "./riders.service";

const createRider = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const riderData= req.body;
    const result = await RiderService.createRider(riderData);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Rider created successfully!',
        data: result,
    });

})

export const RiderController = {
    createRider
}