import mongoose from "mongoose";
import { IProduct } from "../product/product.interface";

export interface ICartItem extends Document {
    // product: IProduct;
    _id?:mongoose.Schema.Types.ObjectId;
    productName:string
    id:mongoose.Schema.Types.ObjectId;
    ImgUrl:string;
    quantity: number;
    price:number;
    selectedOptions: string[];
    specialInstructions: string;
  }
export interface ICart extends mongoose.Document{
    storeId:mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    items:ICartItem[],
    subTotal:number;
    total:number;
    deliveryFee:number

}