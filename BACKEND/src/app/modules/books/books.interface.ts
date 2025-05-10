import { Model } from "mongoose"

export type IBooks ={
    title:string,
    author:string,
    genre:string,
    publicationDate:  Date
}

export type IBooksModel = Model<IBooks>