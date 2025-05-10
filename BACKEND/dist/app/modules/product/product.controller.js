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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_servie_1 = require("./product.servie");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const decodeJwt_1 = require("../../../helpers/jwt/decodeJwt");
const users_model_1 = require("../users/users.model");
const stores_model_1 = require("../stores/stores.model");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req === null || req === void 0 ? void 0 : req.headers.authorization;
        console.log(token);
        const ReqData = decodeJwt_1.JwtHelper.decode(token, "very-secret");
        console.log(ReqData);
        const userData = yield users_model_1.UserModel.findOne({ email: ReqData === null || ReqData === void 0 ? void 0 : ReqData.email });
        const storeData = yield stores_model_1.StoreModel.findOne({ userId: userData === null || userData === void 0 ? void 0 : userData._id });
        const postBody = __rest(req.body, []);
        const data = JSON.parse(postBody.data);
        const ImgUrl = yield fileUploadHelper_1.fileUploadHelper.uploadToCloudinary(req.file);
        const finalData = Object.assign(Object.assign({}, data), { ImgUrl: ImgUrl.url, storeId: storeData === null || storeData === void 0 ? void 0 : storeData._id });
        const result = yield product_servie_1.productServiece.createProduct(finalData);
        res.status(200).json({
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "get store successfully!",
            data: result,
        });
    }
    catch (error) {
    }
});
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_servie_1.productServiece.getProduct();
});
const getProductByStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hi api");
    const id = req.params.id;
    const result = yield product_servie_1.productServiece.getProductByStore(id);
    res.status(200).json({
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "get store successfully!",
        data: result,
    });
});
exports.productController = { createProduct, getProduct, getProductByStore };
