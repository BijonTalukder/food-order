
import mongoose, { Document } from "mongoose"


export interface IOrderItem {
    productId: mongoose.Types.ObjectId;
    productName: string;
    quantity: number;
    price:number;
    selectedOptions?: string[];
    specialInstructions?: string;

}
export enum OrderStatus {
    Pending = 'Pending',
    Preparing = 'Preparing',
    Dispatched = 'Dispatched',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
}

// Enum for payment statuses
export enum PaymentStatus {
    Pending = 'Pending',
    Completed = 'Completed',
    Failed = 'Failed',
}

// Enum for payment methods
export enum PaymentMethod {
    COD = 'Cash on Delivery',
    CreditCard = 'Credit Card',
    UPI = 'UPI',
    Wallet = 'Wallet',
}
export interface IOrder extends Document {
    orderId: string,
    userId: mongoose.Types.ObjectId,
    storeId: mongoose.Types.ObjectId,
    items: IOrderItem[],
    orderStatus: OrderStatus,
    paymentStatus: PaymentStatus,
    paymentMethod: PaymentMethod,
    subTotal: number,
    transactionId:string,
    deliveryAddress:string
    deliveryFee: number,
    discount: number,
    totalAmount: number,
    estimatedDeliveryTime: Date,
    totalPaid:number,
    remainingBalance:number
    placedAt: Date,
    updatedAt: Date


}