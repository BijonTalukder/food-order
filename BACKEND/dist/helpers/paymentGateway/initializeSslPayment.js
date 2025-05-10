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
const uuid_1 = require("uuid");
const ApiError_1 = __importDefault(require("../../app/errors/ApiError"));
// @ts-ignore
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
// const SSLCommerzPayment = require('sslcommerz').SslCommerzPayment
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const SSL_PAYMENT_CREDENTIALS = {
    storeId: process.env.STORE_ID || 'bijon66efc7e8a6d5e',
    storePassword: process.env.STORE_PASSWORD || 'bijon66efc7e8a6d5e@ssl',
    isLive: process.env.IS_LIVE === 'true',
};
const initializeSslPayment = (orderData, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const tran_id = uuidv4();
    const tran_id = (0, uuid_1.v4)();
    const paymentData = {
        total_amount: orderData.totalAmount,
        currency: 'BDT',
        tran_id,
        success_url: `http://localhost:5000/api/v1/success?transactionId=${tran_id}`,
        fail_url: `http://localhost:5000/api/v1/fail?transactionId=${tran_id}`,
        cancel_url: `http://localhost:5000/api/v1/cancel?transactionId=${tran_id}`,
        ipn_url: `http://localhost:5000/api/v1/cancel?transactionId=${tran_id}`,
        shipping_method: 'Courier',
        product_name: 'Order Items',
        product_category: 'software',
        product_profile: 'non-physical-goods',
        cus_name: orderData.userName,
        cus_email: orderData.userEmail || 'bijontalukder1247@gmail.com',
        cus_add1: orderData.deliveryAddress,
        cus_phone: orderData.userPhone || '01632354922',
        ship_name: orderData.userName || 'bijon',
        ship_add1: orderData.deliveryAddress,
        ship_city: 'Dhaka',
        ship_postcode: '1000',
        ship_country: 'Bangladesh',
    };
    const sslcz = new sslcommerz_lts_1.default(SSL_PAYMENT_CREDENTIALS.storeId, SSL_PAYMENT_CREDENTIALS.storePassword, SSL_PAYMENT_CREDENTIALS.isLive);
    try {
        const apiResponse = yield sslcz.init(paymentData);
        const GatewayPageURL = apiResponse.GatewayPageURL;
        if (GatewayPageURL) {
            // res.redirect(GatewayPageURL)
            res.status(http_status_codes_1.default.OK).json({
                success: true,
                message: 'Payment gateway initialized successfully',
                GatewayPageURL,
            });
        }
        else {
            console.log(apiResponse);
            throw new ApiError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Unable to initiate payment');
        }
    }
    catch (err) {
        console.error('SSLCommerz Error:', err); // Log error for debugging
        next(new ApiError_1.default(http_status_codes_1.default.INTERNAL_SERVER_ERROR, `Payment initialization failed: ${err}`));
    }
});
exports.default = initializeSslPayment;
