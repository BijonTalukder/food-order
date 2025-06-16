import mongoose, { model, Schema } from "mongoose";
import { IOrder, IOrderItem, OrderStatus, PaymentMethod, PaymentStatus } from "./order.interface";

const orderItemSchema = new Schema<IOrderItem>({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
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
})



//!order schema
const orderSchema = new Schema<IOrder>({
    orderId: {
        type: String,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    riderId:{
          type: mongoose.Schema.Types.ObjectId,
    },

    items: {
        type: [orderItemSchema],
        required: true
    },
    orderStatus: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Pending
    },
    paymentStatus: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.Pending,
    },
    paymentMethod: {
        type: String,
        enum: Object.values(PaymentMethod),
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
    transactionId:{
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
        default: function() {
            return this.totalAmount - this.totalPaid;  // Calculate remaining balance based on the total amount
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
})
const OrderModel = model<IOrder>('Order', orderSchema);
export default OrderModel;