import { NextFunction, Request, Response } from "express";
import { UserService } from "./users.service";
import httpsStatus from "http-status-codes"

const createUser = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {...userData} = req.body;
        const result = await UserService.createUser(userData)
        res.status(200).json({
            statusCode: httpsStatus.OK,
            success: true,
            message: 'user created successfully!',
            data: result,
        })


    }
    catch(e){

    }

}
export const  UserController ={createUser}