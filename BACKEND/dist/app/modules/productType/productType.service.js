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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTypeService = void 0;
const productType_model_1 = require("./productType.model");
const createProductType = (postData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(postData);
    const result = yield productType_model_1.productTypeModel.create(postData);
    return result;
});
const getProductType = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productType_model_1.productTypeModel.find({});
    return result;
});
const getSingleProductType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productType_model_1.productTypeModel.findOne({ _id: id });
    return result;
});
const updateProductType = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = body, data = __rest(body, ["id"]);
    console.log("service", data);
    const result = yield productType_model_1.productTypeModel.findByIdAndUpdate({ _id: id }, data);
    console.log(result);
    return result;
});
const getProductTypeStore = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productType_model_1.productTypeModel.find({ storeId: id });
    return result;
});
exports.productTypeService = {
    createProductType,
    getProductType,
    getSingleProductType,
    updateProductType,
    getProductTypeStore
};
