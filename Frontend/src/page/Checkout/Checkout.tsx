import React, { useState, useEffect } from 'react';
import { useGetCartByUserQuery } from '../../redux/API/cart/cartsApi'; // Assuming you have a cart API
import { useCreateOrderMutation } from '../../redux/API/order/orderApi'; // Assuming you have an order API
import { StorageManagerCustom } from '../../helpers/SessionHelper';
import { MapPin, Home, Briefcase, Heart, Plus } from 'lucide-react';
import { ICartItem } from '../Stores/Cart/Cart';
import Swal from 'sweetalert2'; // Import SweetAlert2
import 'sweetalert2/src/sweetalert2.scss'; // Import SweetAlert2 styles
import { useNavigate } from 'react-router-dom';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  storeId?:string;
}

const FoodDeliveryOrder = () => {
  const navigate = useNavigate()
  const storageManager = new StorageManagerCustom<User>('local');
  const user = storageManager.getItem('user'); // Assuming you are getting the logged-in user
  const [orderData, setOrderData] = useState<{
    deliveryAddress: string;
    items: ICartItem[]; // Define items as an array of ICartItem
    totalAmount: number;
    paymentMethod: string;
  }>({
    deliveryAddress: '',
    items: [],
    totalAmount: 0,
    paymentMethod: 'Cash on Delivery', // Default to COD (Cash on Delivery)
  });

  const { data: cartData, isSuccess } = useGetCartByUserQuery(user?.id as string, { skip: !user });
  const [createOrder] = useCreateOrderMutation();

  // Calculate the total amount and populate order data
  useEffect(() => {
    if (isSuccess && cartData?.data) {
      const items = cartData.data[0].items;
      const subTotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
      const deliveryFee = 0; // Assuming free delivery for now
      const totalAmount = subTotal + deliveryFee;

      setOrderData({
        ...orderData,
        items,
        totalAmount,
      });
    }
  }, [cartData, isSuccess]);

  // Handle order creation
  const handlePlaceOrder = async () => {
    if (!user) {
      // Show alert if user is not logged in
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to place an order.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#4CAF50',
      });
      return;
    }

    // Check if delivery address is provided
    if (!orderData.deliveryAddress.trim()) {
      // Show error toast if address is empty
      Swal.fire({
        icon: 'error',
        title: 'Missing Address',
        text: 'Please enter a valid delivery address.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#FF4081',
      });
      return;
    }

    const items = orderData.items.map(item => ({
      productId: item.id, // Use the correct field
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      selectedOptions: item.selectedOptions,
      specialInstructions: item.specialInstructions,
    }));

    const order = {
      userId: user.id,
      storeId: 'someStoreId', // Replace with the actual store ID
      items: items,
      deliveryAddress: orderData.deliveryAddress,
      totalAmount: orderData.totalAmount,
      paymentMethod: orderData.paymentMethod,
      subTotal: orderData.totalAmount, // If applicable
      deliveryFee: 0, // If applicable
      discount: 0, // If applicable
    };

    try {
      const res = await createOrder(order).unwrap();
      window.location.href = res.GatewayPageURL;
      console.log(res);


      Swal.fire({
        icon: 'success',
        title: 'Order Placed',
        text: 'Your order has been placed successfully!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#4CAF50',
      });
    } catch (error) {
      console.error('Failed to place order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Order Failed',
        text: 'Failed to place the order. Please try again.',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#FF4081',
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen">
      {/* Left Column - Delivery Address */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Delivery address</h2>
          <button className="btn btn-ghost btn-sm">View Saved Addresses</button>
        </div>

        {/* Map placeholder */}
        <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>

        <div className="flex items-center gap-2 mb-4">
          <MapPin className="text-primary" />
          <div>
            <p className="font-semibold">{orderData.deliveryAddress}</p>
          </div>
          <button className="btn btn-ghost btn-sm ml-auto">Edit</button>
        </div>

        <input
          type="text"
          placeholder="Enter your address"
          required
          className="input input-bordered w-full mb-2"
          value={orderData.deliveryAddress}
          onChange={(e) => setOrderData({ ...orderData, deliveryAddress: e.target.value })}
        />

        <div>
          <p className="mb-2">Add a Label</p>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm"><Home size={16} /> Home</button>
            <button className="btn btn-outline btn-sm"><Briefcase size={16} /> Work</button>
            <button className="btn btn-outline btn-sm"><Heart size={16} /> Partner</button>
            <button className="btn btn-outline btn-sm"><Plus size={16} /> Other</button>
          </div>
        </div>
      </div>

      {/* Right Column - Order Summary */}
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-bold mb-4">Your order from</h2>
        <p className="text-lg mb-4">Ladhidh</p>

        {/* Cart Items */}
        {isSuccess && orderData.items.map((item: any, index: number) => (
          <div className="flex justify-between mb-2" key={index}>
            <span>{item.quantity} x {item.productName}</span>
            <span>Tk {item.price}</span>
          </div>
        ))}

        <hr className="my-4" />

        {/* Order Summary */}
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>Tk {orderData.totalAmount}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Standard delivery</span>
          <span>Free</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Service fee</span>
          <span>Tk 3</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>VAT</span>
          <span>Tk 6</span>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>Tk {orderData.totalAmount}</span>
        </div>
        <p className="text-sm text-gray-500">(incl. fees and tax)</p>

        {/* Payment Method & Place Order Button */}
        <div className="mb-4">
          <p className="mb-2">Payment Method</p>
          <select
            className="select select-bordered w-full"
            value={orderData.paymentMethod}
            onChange={(e) => setOrderData({ ...orderData, paymentMethod: e.target.value })}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="CreditCard">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>

        <button
          className="btn btn-primary w-full mt-4"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>

      {/* SweetAlert2 will show popups */}
    </div>
  );
};

export default FoodDeliveryOrder;
