import { NextFunction, Request, Response } from "express";
import { storeService } from "./stores.service";
import httpsStatus from 'http-status-codes'
import { fileUploadHelper } from "../../../helpers/fileUploadHelper";
import { ICloudinaryResponse, IUploadFile } from "../../interface/file";
import { JwtHelper } from "../../../helpers/jwt/decodeJwt";
import { UserModel } from "../users/users.model";
import mongoose from "mongoose";
import pick from "../../../shared/pick";
const createStore = async (req: Request,
  res: Response,
  next: NextFunction) => {
  const token = req?.headers.authorization
  const ReqData = JwtHelper.decode(token as string, "very-secret");
  console.log(req?.header, ReqData);


  const userData = await UserModel.findOne({ email: ReqData?.email })

  const data = JSON.parse(req?.body?.data);
  const ImgUrl: ICloudinaryResponse = await fileUploadHelper.uploadToCloudinary(req.file as IUploadFile);
  console.log(ImgUrl, "imageUrl");
  const finalData = { ...data, imgUrl: ImgUrl.url, userId: userData?._id };

  const result = await storeService.createStore(finalData);


  res.status(200).json({
    statusCode: httpsStatus.OK,
    success: true,
    message: "book created successfully!",
    data: result,
  });

}

const getStore = async (req: Request, res: Response, next: NextFunction) => {
  const filter = pick(req.query, [
    'priceRange',
    'deliveryTime',
    'category',
    'cuisines',
    'lat',
    'lng',
    'search'
  ]);

  const aggregationPipeline: any[] = [];

  // GeoNear Stage (Only if lat and lng are provided)
  if (filter.lat && filter.lng) {
    aggregationPipeline.push({
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [
            parseFloat(filter.lng as string),
            parseFloat(filter.lat as string),
          ],
        },
        distanceField: 'distance',
        maxDistance: 100 * 1000, // 10 kilometers
        spherical: true,
      },
    });
  }

  // Match Stage for filters like priceRange, deliveryTime, category, cuisines
  const match: any = {};

  if (filter.priceRange) {
    match.price = { $lte: parseInt(filter.priceRange as string) };
  }

  if (filter.deliveryTime) {
    match.deliveryTime = { $lte: parseInt(filter.deliveryTime as string) };
  }

  if (filter.category) {
    match.category = filter.category;
  }

  if (filter.cuisines) {
    match.cuisines = filter.cuisines;
  }

  // Add search term filter if provided
  if (filter.search) {
    aggregationPipeline.push({
      $match: {
        ...match,
        $or: [
          {
            storeName: {
              $regex: filter.search,
              $options: 'i' // Case-insensitive search
            }
          }
        ]
      }
    });
  } else if (Object.keys(match).length > 0) {
    // Add match stage if there are any other filters
    aggregationPipeline.push({ $match: match });
  }

  console.log(aggregationPipeline, '--------------------------');

  try {
    const result = await storeService.getStore(aggregationPipeline);
    res.status(200).json({
      statusCode: httpsStatus.OK,
      success: true,
      message: 'Get store successfully!',
      data: result,
    });
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
};

const getSingleStore = async (req: Request, res: Response, next: NextFunction) => {

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(httpsStatus.BAD_REQUEST).json({
      statusCode: httpsStatus.BAD_REQUEST,
      success: false,
      message: "Invalid store ID",
    });
  }

  const result = await storeService.getSingleStore(id);
  res.status(200).json({
    statusCode: httpsStatus.OK,
    success: true,
    message: "get store successfully!",
    data: result,
  });
}

const getProductByStore = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
}

export const storeController = {
  createStore,
  getStore,
  getSingleStore,
  getProductByStore
}