import mongoose, { Document, Model } from "mongoose";

export type IProductType  =Document & {
    productTypeName:string;
    ImgUrl:string
    createdAt:Date 
    storeId:mongoose.Types.ObjectId

}
export type IProductTypeModel = Model<IProductType>