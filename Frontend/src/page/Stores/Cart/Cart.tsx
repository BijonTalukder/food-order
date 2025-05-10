import React from 'react';
import { useSelector } from 'react-redux';
import { useCreateCartMutation } from '../../../redux/API/cart/cartsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../redux/store';
// interface ICartItemProps {
//   product: {
//     name: string;
//   };
//   price: number;
//   quantity: number;
// }

interface IProduct {
  _id: string;
  name: string;
  price: number;
  // Add other relevant fields like imageUrl, description, etc.
}

export interface ICartItem {
  id?: string
  _id?: string
  ImgUrl: string;
  productName: string;
  // product: IProduct; // The actual product details
  quantity: number;  // Quantity of the product in the cart
  price: number;     // Price per item (could also be product.price)
  selectedOptions: string[]; // Options selected for the product (e.g., size, color)
  specialInstructions: string; // Any special instructions for the order
}

interface ICartData {
  storeId: string;
  userId: string;
  items: ICartItem[];
  subTotal: number;
  total: number;
  deliveryFee: number;
}
const Cart = () => {
  const { id } = useParams();
  const cartItems = useSelector((state: RootState) => state.cart.items) as ICartItem[];
  const totalAmount = cartItems.reduce((total: any, item: any) => total + item.price * item.quantity, 0);
  const [handleCart] = useCreateCartMutation()


  const navigate = useNavigate();
  const handleCheckout = async () => {

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}'); // Get user data from localStorage
      console.log(user)
      if (!user?.id) {
        throw new Error('User is not logged in.');
      }

      const finalData: ICartData = {
        storeId: id as string,
        userId: user.id,
        items: cartItems,
        subTotal: totalAmount,
        total: totalAmount + 5,
        deliveryFee: 5,
      };

      // Send the cart data to the API
      const res = await handleCart(finalData).unwrap();

      alert('Cart successfully submitted!');
      if (res) {
        navigate('/checkout')
      }
      // navigate('/checkout')

    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(`Error: ${error.message}`);
    }

  }
  return (
    <div className="max-w-lg mx-auto h-[450px] overflow-auto border rounded-lg shadow-lg bg-white p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Your Favourite Food</h1>
      <div className="mb-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={item._id} className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
                <img src={item.ImgUrl} alt={item.productName} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-grow mx-4">
                  <h2 className="text-lg font-medium">{item.productName}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-between font-bold text-xl mt-4">
        <span>Total:</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
      <button onClick={handleCheckout} className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
        Checkout
      </button>
    </div>
  );
};

export default Cart;
