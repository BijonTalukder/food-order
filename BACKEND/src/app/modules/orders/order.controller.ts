import { IOrder, OrderStatus, PaymentStatus } from './order.interface';
import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";
import httpsStatus from 'http-status-codes';
import { JwtHelper } from "../../../helpers/jwt/decodeJwt";
import { UserModel } from "../users/users.model";
import { StoreModel } from "../stores/stores.model";
import mongoose, { Types,ObjectId } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
// import { ObjectId } from 'mon';
// import SSLCommerzPayment from 'sslcommerz-lts'
import ApiError from '../../errors/ApiError';
import initializeSslPayment from '../../../helpers/paymentGateway/initializeSslPayment';
import pick from '../../../shared/pick';
import catchAsync from '../../../shared/catchAsync';
// Create a new order
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req?.headers.authorization;

        // Decode token to retrieve user information
        const decodedData = JwtHelper.decode(token as string, "very-secret");
        const userData = await UserModel.findOne({ email: decodedData?.email });

        if (!userData) {
            return res.status(httpsStatus.UNAUTHORIZED).json({
                statusCode: httpsStatus.UNAUTHORIZED,
                success: false,
                message: "User not authorized",
            });
        }

        const storeData = await StoreModel.findOne({ userId: userData._id });

        // Prepare order data
        const { items, deliveryAddress, paymentMethod } = req.body;

        const store_id = 'bijon66efc7e8a6d5e';
        const store_password = 'bijon66efc7e8a6d5e@ssl';
        const is_live = false;
        const tran_id = uuidv4();

        const orderData = {
            userId: userData._id,
            storeId: storeData?._id,
            items,
            deliveryAddress,
            paymentMethod,
            transactionId: tran_id,


            orderId: new mongoose.Types.ObjectId().toString(),
            // customerId: userData._id,  
            orderStatus: OrderStatus.Pending,
            paymentStatus: PaymentStatus.Pending,
            subTotal: 123,
            totalAmount: 12,
            discount: 12
            // createdAt: new Date(),
            // updatedAt: new Date(),
            // Add other fields as required by the IOrder interface
        };

        const result = await orderService.createOrder(orderData);

        if (paymentMethod == "Cash on Delivery") {

            initializeSslPayment(orderData, res, next);
            return;

            // Initialize SSLCommerz


            // Call SSLCommerz API and handle response



        }

        res.status(httpsStatus.CREATED).json({
            statusCode: httpsStatus.CREATED,
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};


//update order
const updateOrder= async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id = req.params.id;
      
        const result = await orderService.updateOrder(id ,req.body);
        return res.status(httpsStatus.OK).json({
            statusCode: httpsStatus.OK,
            success: true,
            message: "Order updated successfully!",
            data: result,
        })
        
    } catch (error) {
        next(error);
        
    }
}
// Get all orders
const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await orderService.getAllOrders();

        res.status(httpsStatus.OK).json({
            statusCode: httpsStatus.OK,
            success: true,
            message: "Orders retrieved successfully!",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// Get orders by store
const getOrdersByStore = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const filters = pick(req.query, ["searchTerm","orderStatus"])
        const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"])
        const storeId = req.params.id;
        const result = await orderService.getOrdersByStore(storeId,filters,options);

        res.status(httpsStatus.OK).json({
            statusCode: httpsStatus.OK,
            success: true,
            message: "Orders retrieved successfully for the store!",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getOrderByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const result = await orderService.getOrdersByUser(userId);

        res.status(httpsStatus.OK).json({
            statusCode: httpsStatus.OK,
            success: true,
            message: "Orders retrieved successfully for the user!",
            data: result,
        });
    } catch (error) {
        next(error);
    }
}
const getOrderByRider = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const riderId = req.params.id;

    // Validate the riderId
    if (!Types.ObjectId.isValid(riderId)) {
        throw new ApiError(httpsStatus.BAD_REQUEST, "Invalid rider ID");
    }
        const filters = pick(req.query, ["searchTerm","orderStatus"])
        const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"])
    // Fetch orders assigned to the rider
    const orders = await orderService.getOrdersByRider(riderId);

    if (!orders || orders.length === 0) {
        return res.status(httpsStatus.NOT_FOUND).json({
            statusCode: httpsStatus.NOT_FOUND,
            success: false,
            message: "No orders found for this rider",
        });
    }

    res.status(httpsStatus.OK).json({
        statusCode: httpsStatus.OK,
        success: true,
        message: "Orders retrieved successfully for the rider!",
        data: orders,
    });
})
// Export the order controller
export const orderController = {
    createOrder,
    getAllOrders,
    getOrdersByStore,
    getOrderByUser,
    updateOrder,
    getOrderByRider
};
