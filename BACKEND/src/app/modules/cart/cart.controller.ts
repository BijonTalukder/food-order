import httpsStatus from 'http-status-codes'
import { NextFunction, Request, Response } from "express";
import { cartService } from "./cart.service";
import mongoose from 'mongoose';

const createCart = async(req:Request,res:Response,next:NextFunction)=>{
    const result = await cartService.createCart(req.body);
    res.status(200).json({
        statusCode: httpsStatus.OK,
        success: true,
        message: "get cart successfully!",
        data: result,
      });
    
}
const getCartByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const objectId = new mongoose.Types.ObjectId(req.params.id);
        const result = await cartService.getCartByUser(objectId);
        res.status(httpsStatus.OK).json({
            statusCode: httpsStatus.OK,
            success: true,
            message: "Get cart successfully!",
            data: result,
        });
    } catch (error) {
        next(error); // Forward any errors to the error handling middleware
    }
};
export const cartController={
    createCart,
    getCartByUser
}