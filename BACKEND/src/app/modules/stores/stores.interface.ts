import mongoose, { Model } from "mongoose";

 export enum StoreStatus {
    Active = 'active',
    Inactive = 'inactive',
    Pending = 'pending',
    Deleted = 'deleted',
    Open='open',
    Busy='busy',
    Close='close'
}


export interface IStore extends mongoose.Document {
    storeName: string;
    userId: mongoose.Types.ObjectId;
    imgUrl: string;
    status: StoreStatus;
    storeDetails:string;
    rating:{
        average:number,
        total:number
    };
    isApproved:string;
    operatingHours:{
        open:string;
        close:string
    };
    deliveryFee:number;
    pointLocation: {
        storeAddress: string;
        type:string;
        coordinates: number[];     
    };
}
 export const IStoreModel= Model<IStore>