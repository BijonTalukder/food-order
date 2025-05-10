import mongoose from "mongoose";
import { StoreModel } from "./stores.model";

const createStore = async (postBody: any) => {

    const result = await StoreModel.create(postBody);
    return result;
}
const getStore = async (aggregationPipeline: any[]) => {
    const result = await StoreModel.aggregate(aggregationPipeline);
    return result;
};
const getSingleStore = async (id: any) => {
    const objectId = new mongoose.Types.ObjectId(id);

    // const objectId = mongoose.Types.ObjectId(id);

    // Check if the find query works
    const findResult = await StoreModel.find({
        _id: objectId
    });
    console.log("Find result:", findResult);

    // Now use the objectId in the aggregate
    const aggregateResult = await StoreModel.aggregate([
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

}

export const storeService = {
    createStore,
    getStore,
    getSingleStore
}