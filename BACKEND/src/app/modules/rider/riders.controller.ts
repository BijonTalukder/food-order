import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { RiderService } from "./riders.service";
import { AuthService } from "../auth/auth.service";

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

const loginRider = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const riderData= req.body;
    const result = await AuthService.LogIn(riderData);
    const token = result?.token;
    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            success: false,
            message: 'Unauthorized',
        });
    }
    res.cookie('token',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', 
        maxAge: 24 * 60 * 60 * 1000, 
    })
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Rider login successfully!',
        data: result,
    });

})
export const RiderController = {
    createRider,loginRider
}