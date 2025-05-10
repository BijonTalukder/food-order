"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_interface_1 = require("./order.interface");
const order_service_1 = require("./order.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const decodeJwt_1 = require("../../../helpers/jwt/decodeJwt");
const users_model_1 = require("../users/users.model");
const stores_model_1 = require("../stores/stores.model");
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const initializeSslPayment_1 = __importDefault(require("../../../helpers/paymentGateway/initializeSslPayment"));
// Create a new order
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req === null || req === void 0 ? void 0 : req.headers.authorization;
        // Decode token to retrieve user information
        const decodedData = decodeJwt_1.JwtHelper.decode(token, "very-secret");
        const userData = yield users_model_1.UserModel.findOne({ email: decodedData === null || decodedData === void 0 ? void 0 : decodedData.email });
        if (!userData) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                statusCode: http_status_codes_1.default.UNAUTHORIZED,
                success: false,
                message: "User not authorized",
            });
        }
        const storeData = yield stores_model_1.StoreModel.findOne({ userId: userData._id });
        // Prepare order data
        const { items, deliveryAddress, paymentMethod } = req.body;
        const store_id = 'bijon66efc7e8a6d5e';
        const store_password = 'bijon66efc7e8a6d5e@ssl';
        const is_live = false;
        const tran_id = (0, uuid_1.v4)();
        const orderData = {
            userId: userData._id,
            storeId: storeData === null || storeData === void 0 ? void 0 : storeData._id,
            items,
            deliveryAddress,
            paymentMethod,
            transactionId: tran_id,
            orderId: new mongoose_1.default.Types.ObjectId().toString(),
            // customerId: userData._id,  
            orderStatus: order_interface_1.OrderStatus.Pending,
            paymentStatus: order_interface_1.PaymentStatus.Pending,
            subTotal: 123,
            totalAmount: 12,
            discount: 12
            // createdAt: new Date(),
            // updatedAt: new Date(),
            // Add other fields as required by the IOrder interface
        };
        const result = yield order_service_1.orderService.createOrder(orderData);
        if (paymentMethod == "Cash on Delivery") {
            (0, initializeSslPayment_1.default)(orderData, res, next);
            return;
            // Initialize SSLCommerz
            // Call SSLCommerz API and handle response
        }
        res.status(http_status_codes_1.default.CREATED).json({
            statusCode: http_status_codes_1.default.CREATED,
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Get all orders
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderService.getAllOrders();
        res.status(http_status_codes_1.default.OK).json({
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Orders retrieved successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Get orders by store
const getOrdersByStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storeId = req.params.id;
        const result = yield order_service_1.orderService.getOrdersByStore(storeId);
        res.status(http_status_codes_1.default.OK).json({
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Orders retrieved successfully for the store!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getOrderByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const result = yield order_service_1.orderService.getOrdersByUser(userId);
        res.status(http_status_codes_1.default.OK).json({
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Orders retrieved successfully for the user!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Export the order controller
exports.orderController = {
    createOrder,
    getAllOrders,
    getOrdersByStore,
    getOrderByUser
};
