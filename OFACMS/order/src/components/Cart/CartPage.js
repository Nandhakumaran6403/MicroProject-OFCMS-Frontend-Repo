import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "./cartSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus, faMinus, faShoppingCart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="container mx-auto mt-10 p-4 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-teal-600 flex items-center">
        <FontAwesomeIcon icon={faShoppingCart} className="mr-2 text-teal-600" />
        Shopping Cart
      </h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-teal-100 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 bg-teal-100 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 bg-teal-100 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 bg-teal-100 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 bg-teal-100 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 bg-teal-100 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cart.map((item) => (
                <tr key={item.productId} className="hover:bg-gray-50 transition-colors duration-300">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                       src={`data:image/jpeg;base64,${item.imageUrl}`}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Rs.{item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecreaseQuantity(item.productId)}
                        className="bg-teal-200 text-teal-700 px-3 py-1 rounded-l hover:bg-teal-300 transition-colors duration-300"
                        disabled={item.quantity <= 1}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="text-center w-12 border border-gray-300 rounded-md"
                      />
                      <button
                        onClick={() => handleIncreaseQuantity(item.productId)}
                        className="bg-teal-200 text-teal-700 px-3 py-1 rounded-r hover:bg-teal-300 transition-colors duration-300"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Rs.{(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/usermain')}
                className="bg-gray-300 text-md text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Continue Shopping
              </button>
              <button
                onClick={handleClearCart}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                Clear Cart
              </button>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              <span className="font-bold text-teal-600">Total:</span> Rs.{calculateTotal()}
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
