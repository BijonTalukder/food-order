import { NextFunction, Request, Response } from "express";
import OrderModel from "../orders/order.model";
import { PaymentStatus } from "../orders/order.interface";

// Handle payment success
const handlePaymentSuccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { transactionId } = req.query;

        if (!transactionId) {
            return res.status(400).json({ error: "Transaction ID is required." });
        }

        const orderData = await OrderModel.findOne({ transactionId });
        if (!orderData) {
            return res.status(404).json({ error: "Order not found." });
        }

        await OrderModel.updateOne(
            { transactionId },
            { $set: { paymentStatus: PaymentStatus.Completed } } 
        );

        console.log(orderData);

        res.redirect(`http://localhost:3000/payment-success`);
    } catch (error) {
        next(error); // Pass the error to your error-handling middleware
    }
};

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

export const paymentController = {
    handlePaymentSuccess,
    // handlePaymentFail,
    // handlePaymentCancel
};
