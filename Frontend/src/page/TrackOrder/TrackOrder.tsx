import React, { useState } from 'react';
import { 
  MapPin, 
  Truck, 
  CheckCircle, 
  Clock, 
  ChefHat, 
  Phone, 
  MessageSquare 
} from 'lucide-react';

const OrderTracking = () => {
  const [activeStep, setActiveStep] = useState(3); // Current order status (0-4)
  const orderSteps = [
    { icon: ChefHat, label: 'Order Received', description: 'Restaurant preparing your meal' },
    { icon: Clock, label: 'Preparing', description: 'Chef is cooking your dishes' },
    { icon: Truck, label: 'Out for Delivery', description: 'Your order is on its way' },
    { icon: MapPin, label: 'Arriving Soon', description: 'Delivery partner near your location' },
    { icon: CheckCircle, label: 'Delivered', description: 'Order has been delivered' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 space-y-6">
        {/* Order Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Tracking Order #5678</h1>
          <p className="text-gray-600 mt-2">Estimated Delivery: 30-40 mins</p>
        </div>

        {/* Order Tracking Steps */}
        <div className="space-y-4">
          {orderSteps.map((step, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                index <= activeStep 
                  ? 'bg-green-50 border-l-4 border-green-500' 
                  : 'bg-gray-50 border-l-4 border-gray-300'
              }`}
            >
              <step.icon 
                className={`h-8 w-8 ${
                  index <= activeStep ? 'text-green-500' : 'text-gray-400'
                }`} 
              />
              <div>
                <h3 className={`font-semibold ${
                  index <= activeStep ? 'text-green-800' : 'text-gray-600'
                }`}>
                  {step.label}
                </h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Details */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <MapPin className="h-6 w-6 text-blue-500" />
            <div>
              <h4 className="font-semibold text-gray-800">Delivery Address</h4>
              <p className="text-gray-600">123 Foodie Lane, Culinary City, 54321</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-6 w-6 text-green-500" />
            <div>
              <h4 className="font-semibold text-gray-800">Contact Delivery Partner</h4>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Chat</span>
          </button>
          <button className="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 flex items-center justify-center space-x-2">
            <Truck className="h-5 w-5" />
            <span>Track on Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;