import { NextFunction, Request, Response } from "express";

const catchAsync = (fn:(req:Request, res:Response, next:NextFunction)=>Promise<any>)=>async(req:Request, res:Response, next:NextFunction)=>{
    try {
       await  fn(req, res, next)
    } catch (error) {
        next(error)
    }
}
export default catchAsync