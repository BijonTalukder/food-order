"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModel = void 0;
const mongoose_1 = require("mongoose");
const storeSchema = new mongoose_1.Schema({
    storeName: {
        type: String
    },
    storeDetails: {
        type: String
    },
    imgUrl: {
        type: String
    },
    pointLocation: {
        storeAddress: {
            type: String
        },
        type: {
            type: String,
            enum: ["Point"],
            // required: true,
            default: "Point",
        },
        coordinates: {
            type: [
                Number
            ]
        }
    },
    isApproved: {
        type: String,
        enum: ["approved", "reject", "pending"],
        default: "pending"
    },
    status: {
        type: String,
        enum: ["open", "close", "busy", "active", "inactive", "pending", "deleted"]
    },
    rating: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        totalRatings: {
            type: Number,
            default: 0
        }
    },
    operatingHours: {
        open: {
            type: String,
            required: true
        },
        close: {
            type: String,
            required: true
        }
    },
    deliveryFee: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'users'
    }
});
storeSchema.index({ pointLocation: "2dsphere" });
exports.StoreModel = (0, mongoose_1.model)('Store', storeSchema);
