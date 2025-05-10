import { IProductType } from "./productType.interface";
import { productTypeModel } from "./productType.model"

const createProductType = async (postData: any) => {
  console.log(postData);

  const result = await productTypeModel.create(postData);
  return result;
};
const getProductType = async () => {
  const result = await productTypeModel.find({});
  return result;
};
const getSingleProductType = async (id: any) => {
  const result = await productTypeModel.findOne({ _id: id });
  return result;
};
const updateProductType = async (body: any) => {
  const { id, ...data } = body;

  console.log("service", data);

  const result = await productTypeModel.findByIdAndUpdate({ _id: id }, data);
  console.log(result);

  return result;
};
const getProductTypeStore = async (id:any)=>{
  const result = await productTypeModel.find({storeId:id});
  return result
}
export const productTypeService = {
  createProductType,
  getProductType,
  getSingleProductType,
  updateProductType,
  getProductTypeStore
};