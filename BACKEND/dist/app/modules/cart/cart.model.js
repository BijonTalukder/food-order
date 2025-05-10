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
exports.cartModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const cartItemSchema = new mongoose_1.Schema({
    productName: { type: String },
    // product:{type:[]},
    id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product", required: true },
    price: { type: Number },
    quantity: { type: Number, required: true },
    selectedOptions: { type: [String], default: [] },
    specialInstructions: { type: String, default: "" }
});
const cartSchema = new mongoose_1.Schema({
    storeId: { type: mongoose_1.default.Types.ObjectId },
    userId: { type: mongoose_1.default.Types.ObjectId },
    items: {
        type: [cartItemSchema]
    },
    subTotal: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    deliveryFee: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
exports.cartModel = (0, mongoose_1.model)('carts', cartSchema);
