



import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCreditCard, faReceipt, faBarcode } from '@fortawesome/free-solid-svg-icons';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('Debitcard');
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        upiId: ''
    });
    const [errors, setErrors] = useState({});
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateAllFields();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const user = sessionStorage.getItem("userid");

        try {
            const orderResponse = await axios.post('http://localhost:6789/orders', {
                customer: {
                    customerId: user
                },
                orderDate: new Date().toISOString(),
                status: 'PENDING',
                totalAmount: calculateTotalAmount(),
                paymentMethod: paymentMethod.toUpperCase(),
                paymentStatus: 'COMPLETED'
            });

            const { orderId } = orderResponse.data;
            const orderItemsResponses = await postOrderItems(orderId);

            navigate(paymentMethod === 'Debitcard' ? '/otppage' : '/otppageupi', {
                state: {
                    cartItems: location.state.cartItems,
                    userDetails: location.state.userDetails,
                    orderResponse: orderResponse.data,
                    orderItemsResponses
                }
            });
        } catch (error) {
            console.error('Error during order submission:', error);
            setErrorMessage('An error occurred while processing your order. Please try again.');
            setShowErrorModal(true);
        }
    };

    const postOrderItems = async (orderId) => {
        const cartItems = location.state.cartItems;
        const responses = [];

        for (const item of cartItems) {
            const response = await axios.post('http://localhost:6789/order-items', {
                order: {
                    orderId: orderId
                },
                product: {
                    productId: item.productId
                },
                quantity: item.quantity,
                price: item.price * item.quantity
            });
            responses.push(response.data);
        }

        return responses;
    };

    const calculateTotalAmount = () => {
        return location.state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const validateField = (name, value) => {
        let error = '';
        
        switch (name) {
            case 'cardNumber':
                if (!/^\d{16}$/.test(value)) error = 'Card number must be 16 digits';
                break;
            case 'cardName':
                if (!value.trim()) error = 'Card name is required';
                break;
            case 'expiryDate':
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) error = 'Expiry date must be in MM/YY format';
                else {
                    const [month, year] = value.split('/');
                    const expiry = new Date(`20${year}`, month - 1);
                    if (expiry < new Date()) error = 'Card has expired';
                }
                break;
            case 'cvv':
                if (!/^\d{3}$/.test(value)) error = 'CVV must be 3 digits';
                break;
            case 'upiId':
                if (!/^[\w\.-]+@[\w\.-]+$/.test(value)) error = 'Invalid UPI ID format';
                break;
            default:
                break;
        }
        
        setErrors({ ...errors, [name]: error });
    };

    const validateAllFields = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            validateField(field, formData[field]);
            if (errors[field]) newErrors[field] = errors[field];
        });
        return newErrors;
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

    const { cartItems, userDetails } = location.state || {};

    if (!cartItems) return <p>No cart items available.</p>;

    return (
        <div className="container mx-auto mt-10 p-4 md:p-8">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Go Back
                </button>
            </div>
            <h1 className="text-3xl font-semibold mb-6 text-blue-600 animate__animated animate__fadeIn">Payment</h1>
            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                <div className="lg:w-1/3 bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-10 hover:shadow-xl duration-300 ease-in-out">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-700">
                        <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-blue-500" />
                        Payment Method
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-4">
                            {/* <label className="block text-sm font-medium mb-2">Payment Method</label> */}
                            <select
                                className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                                value={paymentMethod}
                                onChange={handlePaymentMethodChange}
                            >
                                <option value="Debitcard">Credit/Debit Card</option>
                                <option value="upi">UPI</option>
                            </select>
                        </div>

                        {paymentMethod === 'Debitcard' && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        className={`block w-full p-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out`}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="16"
                                        required
                                    />
                                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Card Name</label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        value={formData.cardName}
                                        onChange={handleInputChange}
                                        className={`block w-full p-2 border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out`}
                                        placeholder="Nandha"
                                        required
                                    />
                                    {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                                </div>
                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            className={`block w-full p-2 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out`}
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            required
                                        />
                                        {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium mb-2">CVV</label>
                                        <input
                                            type="password"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            className={`block w-full p-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out`}
                                            placeholder="123"
                                            maxLength="3"
                                            required
                                        />
                                        {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                                    </div>
                                </div>
                            </>
                        )}

                        {paymentMethod === 'upi' && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">UPI ID</label>
                                <input
                                    type="text"
                                    name="upiId"
                                    value={formData.upiId}
                                    onChange={handleInputChange}
                                    className={`block w-full p-2 border ${errors.upiId ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out`}
                                    placeholder="example@upi"
                                    required
                                />
                                {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center"
                        >
                            <span className="mr-2" style={{ fontSize: '1.25rem' }}>₹</span>
                            Submit Payment
                        </button>
                    </form>
                </div>

                <div className="lg:w-2/3 space-y-6">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-10 hover:shadow-xl duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold mb-4 text-blue-700">
                            <FontAwesomeIcon icon={faReceipt} className="mr-2 text-blue-500" />
                            Shipping Details
                        </h2>
                        <p><strong>UserName:</strong> {userDetails.username.toUpperCase()}</p>
                        <p><strong>First Name:</strong> {userDetails.firstName}</p>
                        <p><strong>Last Name:</strong> {userDetails.lastName}</p>
                        <p><strong>Address:</strong> {userDetails.address}</p>
                        <p><strong>City:</strong> {userDetails.city}</p>
                        <p><strong>State:</strong> {userDetails.state}</p>
                        <p><strong>Country:</strong> {userDetails.country}</p>
                        <p><strong>Zipcode:</strong> {userDetails.zipcode}</p>
                        <p><strong>Phone:</strong> {userDetails.phone}</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-10 hover:shadow-xl duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold mb-4 text-blue-700">
                            <FontAwesomeIcon icon={faBarcode} className="mr-2 text-blue-500" />
                            Cart Items
                        </h2>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <tr key={item.productId}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <img
                                                 src={`data:image/jpeg;base64,${item.imageUrl}`}
                                                alt={item.productName}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {item.productName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.quantity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ₹{item.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ₹{item.price * item.quantity}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-right text-sm font-medium text-gray-900">Total Amount</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{calculateTotalAmount()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Error Modal */}
            {showErrorModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                        <h2 className="text-lg font-semibold text-red-600">Error</h2>
                        <p className="text-sm text-gray-700 mt-2">{errorMessage}</p>
                        <button
                            onClick={handleCloseErrorModal}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentPage;
