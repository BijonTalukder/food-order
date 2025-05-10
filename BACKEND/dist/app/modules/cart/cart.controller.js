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
exports.cartController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const cart_service_1 = require("./cart.service");
const mongoose_1 = __importDefault(require("mongoose"));
const createCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_service_1.cartService.createCart(req.body);
    res.status(200).json({
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "get cart successfully!",
        data: result,
    });
});
const getCartByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongoose_1.default.Types.ObjectId(req.params.id);
        const result = yield cart_service_1.cartService.getCartByUser(objectId);
        res.status(http_status_codes_1.default.OK).json({
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Get cart successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error); // Forward any errors to the error handling middleware
    }
});
exports.cartController = {
    createCart,
    getCartByUser
};
