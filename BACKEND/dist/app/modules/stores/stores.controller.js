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
exports.storeController = void 0;
const stores_service_1 = require("./stores.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const decodeJwt_1 = require("../../../helpers/jwt/decodeJwt");
const users_model_1 = require("../users/users.model");
const mongoose_1 = __importDefault(require("mongoose"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const createStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req === null || req === void 0 ? void 0 : req.headers.authorization;
    const ReqData = decodeJwt_1.JwtHelper.decode(token, "very-secret");
    console.log(req === null || req === void 0 ? void 0 : req.header, ReqData);
    const userData = yield users_model_1.UserModel.findOne({ email: ReqData === null || ReqData === void 0 ? void 0 : ReqData.email });
    const data = JSON.parse((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.data);
    const ImgUrl = yield fileUploadHelper_1.fileUploadHelper.uploadToCloudinary(req.file);
    console.log(ImgUrl, "imageUrl");
    const finalData = Object.assign(Object.assign({}, data), { imgUrl: ImgUrl.url, userId: userData === null || userData === void 0 ? void 0 : userData._id });
    const result = yield stores_service_1.storeService.createStore(finalData);
    res.status(200).json({
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "book created successfully!",
        data: result,
    });
});
const getStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.default)(req.query, [
        'priceRange',
        'deliveryTime',
        'category',
        'cuisines',
        'lat',
        'lng',
        'search'
    ]);
    const aggregationPipeline = [];
    // GeoNear Stage (Only if lat and lng are provided)
    if (filter.lat && filter.lng) {
        aggregationPipeline.push({
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [
                        parseFloat(filter.lng),
                        parseFloat(filter.lat),
                    ],
                },
                distanceField: 'distance',
                maxDistance: 10 * 1000,
                spherical: true,
            },
        });
    }
    // Match Stage for filters like priceRange, deliveryTime, category, cuisines
    const match = {};
    if (filter.priceRange) {
        match.price = { $lte: parseInt(filter.priceRange) };
    }
    if (filter.deliveryTime) {
        match.deliveryTime = { $lte: parseInt(filter.deliveryTime) };
    }
    if (filter.category) {
        match.category = filter.category;
    }
    if (filter.cuisines) {
        match.cuisines = filter.cuisines;
    }
    // Add search term filter if provided
    if (filter.search) {
        aggregationPipeline.push({
            $match: Object.assign(Object.assign({}, match), { $or: [
                    {
                        storeName: {
                            $regex: filter.search,
                            $options: 'i' // Case-insensitive search
                        }
                    }
                ] })
        });
    }
    else if (Object.keys(match).length > 0) {
        // Add match stage if there are any other filters
        aggregationPipeline.push({ $match: match });
    }
    console.log(aggregationPipeline, '--------------------------');
    try {
        const result = yield stores_service_1.storeService.getStore(aggregationPipeline);
        res.status(200).json({
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: 'Get store successfully!',
            data: result,
        });
    }
    catch (error) {
        next(error); // Pass error to error-handling middleware
    }
});
const getSingleStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(http_status_codes_1.default.BAD_REQUEST).json({
            statusCode: http_status_codes_1.default.BAD_REQUEST,
            success: false,
            message: "Invalid store ID",
        });
    }
    const result = yield stores_service_1.storeService.getSingleStore(id);
    res.status(200).json({
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "get store successfully!",
        data: result,
    });
});
const getProductByStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
});
exports.storeController = {
    createStore,
    getStore,
    getSingleStore,
    getProductByStore
};
