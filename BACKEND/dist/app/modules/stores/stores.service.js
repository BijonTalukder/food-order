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
exports.storeService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const stores_model_1 = require("./stores.model");
const createStore = (postBody) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stores_model_1.StoreModel.create(postBody);
    return result;
});
const getStore = (aggregationPipeline) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stores_model_1.StoreModel.aggregate(aggregationPipeline);
    return result;
});
const getSingleStore = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    // const objectId = mongoose.Types.ObjectId(id);
    // Check if the find query works
    const findResult = yield stores_model_1.StoreModel.find({
        _id: objectId
    });
    console.log("Find result:", findResult);
    // Now use the objectId in the aggregate
    const aggregateResult = yield stores_model_1.StoreModel.aggregate([
        {
            $match: {
                _id: objectId
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userDetails"
            }
        }
    ]);
    console.log("Aggregate result:", aggregateResult);
    return aggregateResult;
});
exports.storeService = {
    createStore,
    getStore,
    getSingleStore
};
