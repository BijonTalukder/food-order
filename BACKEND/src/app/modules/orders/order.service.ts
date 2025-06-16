import mongoose, { ObjectId } from "mongoose";
import OrderModel from "./order.model";
import { IOrder } from "./order.interface";

// Create a new order
const createOrder = async (orderData:any) => {
  const result = await OrderModel.create(orderData);
  return result;
};

// Get all orders
const getAllOrders = async () => {
  const result = await OrderModel.find({});
  return result;
};

const updateOrder=async(id:string,postBody:any):Promise<any>=>{
  const result = await OrderModel.updateOne({
    _id:id
  },postBody)
  return result;
}

// Get orders by store ID
const getOrdersByStore = async (storeId: string, filters: any, options: any) => {
  const { limit = 10, page = 1 } = options;
  const skip = (page - 1) * limit;
  const andCondition: any[] = [];

  // Convert storeId to ObjectId
  const objectId = new mongoose.Types.ObjectId(storeId);

  if (filters.searchTerm) {
    andCondition.push({
      $or: [
        { orderNumber: { $regex: filters.searchTerm, $options: 'i' } },
        { 'customer.name': { $regex: filters.searchTerm, $options: 'i' } }
      ]
    });
  }

  const matchCondition: any = {
    storeId: objectId
  };
  if(filters.orderStatus)
  {
    matchCondition["orderStatus"]=filters.orderStatus
  }

  if (andCondition.length > 0) {
    matchCondition.$and = andCondition;
  }

  const result = await OrderModel.aggregate([
    {
      $match: matchCondition
    },
    // Lookup customer details
    // {
    //   $lookup: {
    //     from: 'customers', 
    //     localField: 'customerId', 
    //     foreignField: '_id', 
    //     as: 'customer' 
    //   }
    // },
    // {
    //   $unwind: {
    //     path: '$customer',
    //     preserveNullAndEmptyArrays: true // 
    //   }
    // },
    // Pagination
    { $skip: skip },
    { $limit: limit },
    // Project to shape the output
    // {
    //   $project: {
    //     orderNumber: 1,
    //     total: 1,
    //     status: 1,
    //     'customer.name': 1,
    //     'customer.email': 1
    //   }
    // }
  ]);

  // Count total documents
  const totalOrders = await OrderModel.aggregate([
    { $match: matchCondition },
    { $count: 'totalCount' }
  ]);

  return {
    orders: result,
    pagination: {
      page,
      limit,
      total: totalOrders[0]?.totalCount || 0,
      totalPages: Math.ceil((totalOrders[0]?.totalCount || 0) / limit)
    }
  };
};

const getOrdersByUser= async (userId: string) => {
    const objectId = new mongoose.Types.ObjectId(userId);
  
    const result = await OrderModel.aggregate([
      {
        $match: {
            userId: objectId,
        },
      },
    ]);
    return result;
  };

  const getOrdersByRider = async (riderId: string) => {}
// Export the order service
export const orderService = {
  createOrder,
  getAllOrders,
  getOrdersByStore,
  getOrdersByUser,updateOrder,
  getOrdersByRider
};
