import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";

const LogInUser = async (req:Request,res:Response,next:NextFunction) =>{
    try{

        const {...LogInData} = req.body;
        const result = await AuthService.LogIn(LogInData)
        // return result
        res.status(200).json({data:result})
    }
    catch(e){
        console.log(e)

    }

}
export const AuthController ={
    LogInUser
}