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
exports.paymentController = void 0;
const order_model_1 = __importDefault(require("../orders/order.model"));
// Handle payment success
const handlePaymentSuccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    const orderData = yield order_model_1.default.findOne({
        transactionId
    });
    try {
        res.redirect(`http://localhost:3000/Product/success`);
    }
    catch (error) {
    }
});
// Handle payment fail
// const handlePaymentFail = catchAsync(async (req, res, next) => {
//     const { transactionId } = req.query;
//     if (!transactionId) {
//         return next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid payment data'));
//     }
//     console.log('Processing payment failure...');
//     try {
//         // Update the order's payment status to 'failed'
//         const updatedRows = await orderModel.update(
//             { paymentStatus: 'failed' },
//             { where: { transactionID: transactionId } }
//         );
//         console.log('Rows updated:', updatedRows);
//         if (updatedRows[0] === 0) {
//             return next(new ApiError(httpStatus.NOT_FOUND, 'Order not found'));
//         }
//         // Redirect to the fail page
//         res.redirect(`${dotenvHelper.frontend_url}/Product/error?transactionId=${transactionId}`);
//     } catch (error) {
//         console.error('Error processing payment failure:', error);
//         return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'));
//     }
// });
// Handle payment cancel
// const handlePaymentCancel = catchAsync(async (req, res, next) => {
//     const { transactionId } = req.query;
//     if (!transactionId) {
//         return next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid payment data'));
//     }
//     console.log('Processing payment cancellation...');
//     try {
//         // Update the order's payment status to 'cancelled'
//         const updatedRows = await orderModel.update(
//             { paymentStatus: 'cancelled' },
//             { where: { transactionID: transactionId } }
//         );
//         console.log('Rows updated:', updatedRows);
//         if (updatedRows[0] === 0) {
//             return next(new ApiError(httpStatus.NOT_FOUND, 'Order not found'));
//         }
//         // Redirect to the cancel page
//         res.redirect(`${dotenvHelper.frontend_url}/Product/error?transactionId=${transactionId}`);
//     } catch (error) {
//         console.error('Error processing payment cancellation:', error);
//         return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'));
//     }
// });
exports.paymentController = {
    handlePaymentSuccess,
    // handlePaymentFail,
    // handlePaymentCancel
};
