import mongoose from "mongoose";
import { IProduct } from "./product.interface"
import { productModel } from "./product.model"

const createProduct =async(postBody:IProduct)=>{
    // console.log(postBody,'postbody final');
    
    const result = await productModel.create(postBody);
    return result;

}
const getProduct = async()=>{
    const result = await productModel.find({});
}

const getProductByStore = async(id:any)=>{
    const objectId = new mongoose.Types.ObjectId(id);

    const result = await productModel.aggregate([
        {
            $match:{
            storeId:objectId
        }
    }

    ])
    return result;
}
export const productServiece={createProduct,getProduct,getProductByStore}
