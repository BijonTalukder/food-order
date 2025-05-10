import React from 'react';
import { CheckCircle, MapPin, Clock, CreditCard } from 'lucide-react';

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg max-w-md w-full p-6 space-y-6">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">Thank you for your order</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <MapPin className="h-6 w-6 text-blue-500" />
            <div>
              <h3 className="font-semibold text-gray-800">Delivery Address</h3>
              <p className="text-gray-600">123 Tasty Street, Foodville, CA 94000</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Clock className="h-6 w-6 text-orange-500" />
            <div>
              <h3 className="font-semibold text-gray-800">Estimated Delivery</h3>
              <p className="text-gray-600">35-45 minutes</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <CreditCard className="h-6 w-6 text-purple-500" />
            <div>
              <h3 className="font-semibold text-gray-800">Payment Method</h3>
              <p className="text-gray-600">Visa **** 4567</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Margherita Pizza</span>
              <span className="text-gray-700">$12.99</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Caesar Salad</span>
              <span className="text-gray-700">$6.50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Delivery Fee</span>
              <span className="text-gray-700">$3.50</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>$22.99</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300">
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;