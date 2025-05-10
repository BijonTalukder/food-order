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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = void 0;
const product_model_1 = require("../product/product.model");
const stores_model_1 = require("../stores/stores.model");
const users_model_1 = require("../users/users.model");
const cart_model_1 = require("./cart.model");
const validateCartItemsRecursive = (items, index = 0) => __awaiter(void 0, void 0, void 0, function* () {
    if (index >= items.length) {
        return;
    }
    let product = items[index];
    console.log('hello dev', items);
    let originalProduct = yield product_model_1.productModel.findOne({ _id: product.id });
    console.log("org", originalProduct);
    if (!originalProduct) {
        throw new Error(`Product not found: ${product.id}`);
    }
    if (originalProduct.price !== product.price) {
        product.price = originalProduct.price;
    }
    yield validateCartItemsRecursive(items, index + 1);
});
const createCart = (postBody) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield users_model_1.UserModel.findOne({ _id: postBody.userId });
    if (!userExist) {
        throw new Error('User not found');
    }
    const storeExist = yield stores_model_1.StoreModel.findOne({ _id: postBody.storeId });
    if (!storeExist) {
        throw new Error('Store not found');
    }
    yield validateCartItemsRecursive(postBody.items);
    const cartExist = yield cart_model_1.cartModel.findOne({ userId: postBody.userId });
    let result;
    if (cartExist) {
        result = yield cart_model_1.cartModel.findOneAndUpdate({ userId: postBody.userId }, postBody, { new: true });
    }
    else {
        result = yield cart_model_1.cartModel.create(postBody);
    }
    return result;
});
const getCartByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.cartModel.find({
        userId: id
    });
    return result;
});
exports.cartService = { createCart, getCartByUser };
