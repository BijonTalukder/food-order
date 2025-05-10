import { NextFunction, Request, RequestHandler, Response } from "express";
import { BookService } from "./books.service";
import httpsStatus from "http-status-codes"

const CreateBook:RequestHandler =async (req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log(req.body);
        

        const {booksData} = req.body
        console.log(booksData);
        
        const result = await BookService.createBook(booksData)
        res.status(200).json({
            statusCode: httpsStatus.OK,
            success: true,
            message: 'book created successfully!',
            data: result,
        })

    }
    catch(e){

    }

}

export const BooksController = {CreateBook}