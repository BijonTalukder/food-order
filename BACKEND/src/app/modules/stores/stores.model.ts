import mongoose, { Mongoose, Schema, model } from "mongoose";
import { IStore } from "./stores.interface";


const storeSchema = new Schema<IStore>({
    storeName:{
        type:String
    },
    storeDetails:{
        type:String
    },
    imgUrl:{
        type:String
    },
    pointLocation:{
        storeAddress:{
            type:String
        },
        type: {
            type: String,
            enum: ["Point"],
            // required: true,
            default: "Point",
          },
        coordinates:{
            type:[
                Number
            ]
        }
    },
    isApproved:{
        type:String,
        enum:["approved","reject","pending"],
        default:"pending"


    },
    status:{
        type:String,
        enum:["open","close","busy","active","inactive","pending","deleted"]
    },
    rating:{
        average:{
            type:Number,
            default:0,
            min:0,
            max:5
        },
        totalRatings:{
            type:Number,
            default:0
        }
    },
    operatingHours:{
        open:{
            type:String,
            required:true
        },
        close:{
            type:String,
            required:true
        }

    },
    deliveryFee:{
        type:Number,
        default:0

    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        unique:true,
        ref:'users'

    }
})
storeSchema.index({ pointLocation: "2dsphere" });
export const StoreModel = model<IStore>('Store', storeSchema);