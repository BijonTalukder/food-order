import mongoose from "mongoose";
import { productModel } from "../product/product.model";
import { StoreModel } from "../stores/stores.model";
import { UserModel } from "../users/users.model";
import { ICart, ICartItem } from "./cart.interface";
import { cartModel } from "./cart.model";


const validateCartItemsRecursive = async (items: ICartItem[], index: number = 0): Promise<void> => {
    if (index >= items.length) {
        return;
    }

    let product = items[index];
    console.log('hello dev', items)
    let originalProduct = await productModel.findOne({ _id: product.id });
    console.log("org", originalProduct)
    if (!originalProduct) {
        throw new Error(`Product not found: ${product.id}`);
    }


    if (originalProduct.price !== product.price) {
        product.price = originalProduct.price;
    }


    await validateCartItemsRecursive(items, index + 1);
};


const createCart = async (postBody: ICart) => {

    const userExist = await UserModel.findOne({ _id: postBody.userId });
    if (!userExist) {
        throw new Error('User not found');
    }


    const storeExist = await StoreModel.findOne({ _id: postBody.storeId });
    if (!storeExist) {
        throw new Error('Store not found');
    }

    await validateCartItemsRecursive(postBody.items);


    const cartExist = await cartModel.findOne({ userId: postBody.userId });

    let result;
    if (cartExist) {

        result = await cartModel.findOneAndUpdate(
            { userId: postBody.userId },
            postBody,
            { new: true }
        );
    } else {

        result = await cartModel.create(postBody);
    }

    return result;
};

const getCartByUser = async (id: string | mongoose.Types.ObjectId): Promise<ICart[]> => {
    const result = await cartModel.find({
        userId: id
    });
    return result;
};



export const cartService = { createCart,getCartByUser };
