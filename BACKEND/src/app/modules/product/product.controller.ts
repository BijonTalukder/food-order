import { NextFunction, Request, Response } from "express"
import { productServiece } from "./product.servie"
import httpsStatus from 'http-status-codes'
import { ICloudinaryResponse, IUploadFile } from "../../interface/file";
import { fileUploadHelper } from "../../../helpers/fileUploadHelper";
import { JwtHelper } from "../../../helpers/jwt/decodeJwt";
import { UserModel } from "../users/users.model";
import { StoreModel } from "../stores/stores.model";
const createProduct =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req?.headers.authorization
    console.log(token);
    
    const ReqData = JwtHelper.decode(token as string,"very-secret");
    console.log(ReqData);
    
    const userData = await UserModel.findOne({email:ReqData?.email})
    const storeData = await StoreModel.findOne({userId:userData?._id});
  
        const { ...postBody } = req.body;
        const data = JSON.parse(postBody.data);
        const ImgUrl:ICloudinaryResponse = await fileUploadHelper.uploadToCloudinary(req.file as IUploadFile);
        const finalData = { ...data, ImgUrl: ImgUrl.url,storeId:storeData?._id };


        const result = await productServiece.createProduct(finalData)
        

        res.status(200).json({
            statusCode: httpsStatus.OK,
            success: true,
            message: "get store successfully!",
            data: result,
          });
        
    } catch (error) {
        
    }

}
const getProduct = async(req:Request,res:Response,next:NextFunction)=>{
    const result = await productServiece.getProduct();
    
}

const getProductByStore = async(req:Request,res:Response,next:NextFunction)=>{

    console.log("hi api")
    const id = req.params.id;
    const result = await productServiece.getProductByStore(id);
        

    res.status(200).json({
        statusCode: httpsStatus.OK,
        success: true,
        message: "get store successfully!",
        data: result,
      });



}
export const productController={createProduct,getProduct,getProductByStore}
