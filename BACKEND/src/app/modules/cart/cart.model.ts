import { IProduct } from './../product/product.interface';
import mongoose, { model, Schema } from "mongoose";
import { ICart, ICartItem } from "./cart.interface";


const cartItemSchema = new Schema<ICartItem>({
    productName:{type:String},
    // product:{type:[]},
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Assuming you are storing product as a reference
   price:{type:Number},
    quantity: { type: Number, required: true },
    selectedOptions: { type: [String], default: [] },
    specialInstructions: { type: String, default: "" }
  });

const cartSchema = new Schema<ICart>({
    storeId:{type: mongoose.Types.ObjectId},
    userId:{type: mongoose.Types.ObjectId},
    items: {
        type:[ cartItemSchema]
    },
    subTotal:{
        type:Number,
        default:0
    },
    total:{
        type:Number,
        default:0
    },
    deliveryFee:{
        type:Number,
        default:0
    }

       
    
},{
    timestamps:true
})

export const cartModel = model<ICart>('carts',cartSchema);