import { NextFunction, Request, RequestHandler, Response } from "express";
import { fileUploadHelper } from "../../../helpers/fileUploadHelper";
import { productTypeService } from "./productType.service";
import httpsStatus from "http-status-codes"
import { JwtHelper } from "../../../helpers/jwt/decodeJwt";
import { UserModel } from "../users/users.model";
import { StoreModel } from "../stores/stores.model";
import { IUploadFile } from "../../interface/file";

const createProductType: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.headers.authorization
    console.log(token);
    
    const ReqData = JwtHelper.decode(token as string,"very-secret");
    console.log(ReqData);
    
    const userData = await UserModel.findOne({email:ReqData?.email})
    const storeData = await StoreModel.findOne({userId:userData?._id});
  
    const { ...postBody } = req.body;
    const data = JSON.parse(postBody.data);
    const ImgUrl = await fileUploadHelper.uploadToCloudinary(req.file as IUploadFile);

    const finalData = { ...data, ImgUrl: ImgUrl.url,storeId:storeData?._id };
    const result = await productTypeService.createProductType(finalData);
    res.status(200).json({
      statusCode: httpsStatus.OK,
      success: true,
      message: "book created successfully!",
      data: result,
    });
  } catch (error) {}
};
const getProductType: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await productTypeService.getProductType();
    res.status(200).json({
      statusCode: httpsStatus.OK,
      success: true,
      message: "get product type successfully!",
      data: result,
    });
  } catch (error) {}
};
const getSingleProdutType: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await productTypeService.getSingleProductType(req.params.id);
    res.status(200).json({
      statusCode: httpsStatus.OK,
      success: true,
      message: "get product type successfully!",
      data: result,
    });
  } catch (error) {}
};
const updateProductType: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  

    const result = await productTypeService.updateProductType({
      id: req.params.id,
      ...req.body,
    });
    res.status(200).json({
      statusCode: httpsStatus.OK,
      success: true,
      message: "get product type successfully!",
      data: result,
    });
  } catch (error) {}
};
const getProductTypeStore:RequestHandler = async(req: Request,
  res: Response,
  next: NextFunction)=>{
    console.log("hello dev");
    const id = req?.params.id
    // const token = req?.headers.authorization
    // console.log(token);
    
    // const ReqData = JwtHelper.decode(token as string,"very-secret");
    // console.log(ReqData);
    
    // const userData = await UserModel.findOne({email:ReqData?.email})
    // const storeData = await StoreModel.findOne({userId:userData?._id});
    // console.log("hit this");
    
  const result = await productTypeService.getProductTypeStore(id);
  res.status(200).json({
    statusCode: httpsStatus.OK,
    success: true,
    message: "get product type successfully!",
    data: result,
  });
}
export const productTypeController = {
  createProductType,
  getProductType,
  getSingleProdutType,
  updateProductType,
  getProductTypeStore
};