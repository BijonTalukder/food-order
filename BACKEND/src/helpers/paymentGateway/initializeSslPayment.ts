import { NextFunction, Response } from "express";
import { v4 as uuidv4 } from 'uuid'
import ApiError from "../../app/errors/ApiError";
// @ts-ignore
import SSLCommerzPayment from 'sslcommerz-lts'
// const SSLCommerzPayment = require('sslcommerz').SslCommerzPayment
import httpsStatus from "http-status-codes";
const SSL_PAYMENT_CREDENTIALS = {
    storeId: process.env.STORE_ID || 'bijon66efc7e8a6d5e',
    storePassword: process.env.STORE_PASSWORD || 'bijon66efc7e8a6d5e@ssl',
    isLive: process.env.IS_LIVE === 'true',
};
const initializeSslPayment = async (orderData: any, res: Response, next: NextFunction) => {
    // const tran_id = uuidv4();
    // const tran_id = uuidv4();
    const paymentData = {
        total_amount: orderData.totalAmount,
        currency: 'BDT',
        tran_id:orderData.transactionId,
          success_url: `http://localhost:5000/api/v1/success?transactionId=${orderData.transactionId}`,
          fail_url: `http://localhost:5000/api/v1/fail?transactionId=${orderData.transactionId}`,
          cancel_url: `http://localhost:5000/api/v1/cancel?transactionId=${orderData.transactionId}`,
          ipn_url: `http://localhost:5000/api/v1/cancel?transactionId=${orderData.transactionId}`,
        shipping_method: 'Courier',
        product_name: 'Order Items', // Placeholder name
        product_category: 'software',
        product_profile: 'non-physical-goods',
        cus_name: orderData.userName,
        cus_email: orderData.userEmail|| 'bijontalukder1247@gmail.com',
        cus_add1: orderData.deliveryAddress,
        cus_phone: orderData.userPhone|| '01632354922',
        ship_name: orderData.userName|| 'bijon',
        ship_add1: orderData.deliveryAddress,
        ship_city: 'Dhaka', // Placeholder city
        ship_postcode: '1000',
        ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(SSL_PAYMENT_CREDENTIALS.storeId, SSL_PAYMENT_CREDENTIALS.storePassword, SSL_PAYMENT_CREDENTIALS.isLive)


    try {
        const apiResponse = await sslcz.init(paymentData);
        const GatewayPageURL = apiResponse.GatewayPageURL;
        if (GatewayPageURL) {

            // res.redirect(GatewayPageURL)
            res.status(httpsStatus.OK).json({
                success: true,
                message: 'Payment gateway initialized successfully',
                GatewayPageURL,
            });
        } else {
            console.log(apiResponse);
            
            throw new ApiError(httpsStatus.BAD_REQUEST, 'Unable to initiate payment');
        }
    } catch (err) {
        console.error('SSLCommerz Error:', err); // Log error for debugging
        next(new ApiError(httpsStatus.INTERNAL_SERVER_ERROR, `Payment initialization failed: ${err}`));
    }
}
export default initializeSslPayment