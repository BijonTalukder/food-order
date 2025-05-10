"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const order_interface_1 = require("./order.interface");
const orderItemSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    selectedOptions: {
        type: [String],
        default: []
    },
    specialInstructions: {
        type: String,
        default: ''
    }
});
//!order schema
const orderSchema = new mongoose_1.Schema({
    orderId: {
        type: String,
        unique: true
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    storeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    items: {
        type: [orderItemSchema],
        required: true
    },
    orderStatus: {
        type: String,
        enum: Object.values(order_interface_1.OrderStatus),
        default: order_interface_1.OrderStatus.Pending
    },
    paymentStatus: {
        type: String,
        enum: Object.values(order_interface_1.PaymentStatus),
        default: order_interface_1.PaymentStatus.Pending,
    },
    paymentMethod: {
        type: String,
        enum: Object.values(order_interface_1.PaymentMethod),
        required: true,
    },
    subTotal: {
        type: Number,
        required: true,
    },
    deliveryFee: {
        type: Number,
        required: true,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
    transactionId: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    estimatedDeliveryTime: {
        type: Date,
    },
    totalPaid: {
        type: Number,
        default: 0,
    },
    remainingBalance: {
        type: Number,
        default: function () {
            return this.totalAmount - this.totalPaid; // Calculate remaining balance based on the total amount
        }
    },
    placedAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
const OrderModel = (0, mongoose_1.model)('Order', orderSchema);
exports.default = OrderModel;
