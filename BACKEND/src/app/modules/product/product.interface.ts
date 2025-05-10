import mongoose from "mongoose";

// Interface for the offer schema
export interface IOffer {
    discount: number;
    startTime: Date;
    endTime: Date;
}

// Interface for the product schema
export interface IProduct extends mongoose.Document {
    productName: string;
    id: number;
    description: string;
    price: number;
    ImgUrl:string;
    quantity: number;
    isAvailable: boolean;
    status: boolean;
    storeId: mongoose.Schema.Types.ObjectId;
    productTypeId: mongoose.Schema.Types.ObjectId;

    offers: IOffer[];
}
