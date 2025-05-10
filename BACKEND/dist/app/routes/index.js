"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_routes_1 = require("../modules/books/books.routes");
const users_routes_1 = require("../modules/users/users.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const productType_routes_1 = require("../modules/productType/productType.routes");
const stores_routes_1 = require("../modules/stores/stores.routes");
const product_routes_1 = require("../modules/product/product.routes");
const cart_routes_1 = require("../modules/cart/cart.routes");
const order_route_1 = require("../modules/orders/order.route");
const payment_controller_1 = require("../modules/payment/payment.controller");
const router = express_1.default.Router();
router.use('/books', books_routes_1.BooksRoute);
router.use('/user', users_routes_1.UserRoute);
router.use('/auth', auth_routes_1.AuthRouter);
router.use('/productType', productType_routes_1.productTypeRouter);
router.use('/stores', stores_routes_1.storeRouter);
router.use("/product", product_routes_1.ProductRouter);
router.use("/cart", cart_routes_1.CartRouter);
router.use("/order", order_route_1.orderRouter);
router.post("/success", payment_controller_1.paymentController.handlePaymentSuccess);
// Fail route - handles failed payment attempts and updates the order status
// router.post('/fail', paymentController.handlePaymentFail);
// Cancel route - handles cancelled payment attempts and updates the order status
// router.post('/cancel', paymentController.handlePaymentCancel);
exports.default = router;
