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
exports.orderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = __importDefault(require("./order.model"));
// Create a new order
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.create(orderData);
    return result;
});
// Get all orders
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find({});
    return result;
});
// Get orders by store ID
const getOrdersByStore = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(storeId);
    const result = yield order_model_1.default.aggregate([
        {
            $match: {
                storeId: objectId,
            },
        },
    ]);
    return result;
});
const getOrdersByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(userId);
    const result = yield order_model_1.default.aggregate([
        {
            $match: {
                userId: objectId,
            },
        },
    ]);
    return result;
});
// Export the order service
exports.orderService = {
    createOrder,
    getAllOrders,
    getOrdersByStore,
    getOrdersByUser
};
