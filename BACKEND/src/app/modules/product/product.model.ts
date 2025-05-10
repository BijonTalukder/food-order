import mongoose, { model, Schema } from "mongoose";
import { IOffer, IProduct } from "./product.interface";


const OfferSchema = new Schema<IOffer>({
    discount: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
});
const productSchema = new Schema<IProduct>({
  productName:{type:String,required:true},
  price:{type:Number,required:true},
  description:{type:String},
  ImgUrl:{
    type:String
},
  quantity:{type:Number},
  isAvailable:{type:Boolean,default:true},
  status:{type:Boolean,default:true},
  storeId:{type:mongoose.Types.ObjectId,ref:'store'},
  productTypeId:{type:mongoose.Types.ObjectId,ref:'productTypes'},
  offers:{type:[OfferSchema],required:false,default:[]}
},{
    timestamps:true
})

export const productModel = model<IProduct>('products',productSchema)