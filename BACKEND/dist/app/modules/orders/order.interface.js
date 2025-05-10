"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethod = exports.PaymentStatus = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "Pending";
    OrderStatus["Preparing"] = "Preparing";
    OrderStatus["Dispatched"] = "Dispatched";
    OrderStatus["Delivered"] = "Delivered";
    OrderStatus["Cancelled"] = "Cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
// Enum for payment statuses
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Pending"] = "Pending";
    PaymentStatus["Completed"] = "Completed";
    PaymentStatus["Failed"] = "Failed";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
// Enum for payment methods
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["COD"] = "Cash on Delivery";
    PaymentMethod["CreditCard"] = "Credit Card";
    PaymentMethod["UPI"] = "UPI";
    PaymentMethod["Wallet"] = "Wallet";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
