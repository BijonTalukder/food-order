import { Schema, model } from "mongoose";
import { IBooks, IBooksModel } from "./books.interface";

const BooksSchema = new Schema<IBooks>({
    title:{
        type:String
    },
    author:{
        type:String
    },
    genre:{
        type:String
    },
    publicationDate:{
        type: Date
    }
},{
    timestamps: true
})

export const BooksModel= model<IBooks,IBooksModel>("Books",BooksSchema)