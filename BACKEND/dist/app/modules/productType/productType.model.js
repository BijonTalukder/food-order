"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTypeModel = void 0;
const mongoose_1 = require("mongoose");
const productTypeSchema = new mongoose_1.Schema({
    productTypeName: {
        type: String
    },
    ImgUrl: {
        type: String
    },
    storeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
});
exports.productTypeModel = (0, mongoose_1.model)("productTypes", productTypeSchema);
