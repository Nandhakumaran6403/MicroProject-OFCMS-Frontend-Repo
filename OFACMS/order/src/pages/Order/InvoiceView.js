



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import EmployeeSidebar from "../../components/Employee/EmployeeSidebar";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";

const InvoiceView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const orderResponse = await axios.get(`http://localhost:6789/orders/${id}`);
        setOrderDetails(orderResponse.data);

        const itemsResponse = await axios.get('http://localhost:6789/order-items/all');
        const allOrderItems = itemsResponse.data;

        const filteredOrderItems = allOrderItems.filter(item => item.order.orderId === parseInt(id));
        setOrderItems(filteredOrderItems);
      } catch (err) {
        setError('Failed to fetch order data');
        console.error(err);
      }
    };

    fetchOrderData();
  }, [id]);

  const handleBackToOrderView = () => {
    navigate(`/orderview/${id}`);
  };

  const handleDownloadPDF = async () => {
    const input = document.getElementById('invoice-content');
    try {
      // Hide the buttons before generating PDF
      document.querySelector('.invoice-buttons').style.display = 'none';
      
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width * 0.75;
      const imgHeight = (canvas.height * 0.75 * pdfWidth) / imgWidth;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      pdf.save(`invoice_${id}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      // Show the buttons again after generating PDF
      document.querySelector('.invoice-buttons').style.display = 'flex';
    }
  };

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />
        <div className="relative flex min-h-screen flex-col py-12">
          <div
            className="relative bg-white px-8 py-10 shadow-xl mx-auto w-full max-w-screen-lg rounded-2xl border border-gray-200"
            id="invoice-content"
          >
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Invoice</h1>

            {/* Invoice Header */}
            {orderDetails && (
              <div className="mb-8">
                <div className="flex justify-between mb-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-700">Invoice # {orderDetails.orderId}</h2>
                    <p className="text-gray-600"><strong>Date:</strong> {new Date(orderDetails.orderDate).toLocaleDateString()}</p>
                    <p className="text-gray-600"><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
                    <p className="text-gray-600"><strong>Payment Status:</strong> {orderDetails.paymentStatus}</p>
                    <p className="text-gray-600"><strong>Status:</strong> {orderDetails.status}</p>
                    <p className="text-gray-800 text-xl font-bold"><strong>Total Amount:</strong> Rs.{orderDetails.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <h2 className="text-lg font-semibold text-gray-700">Billing Information</h2>
                    <p className="text-gray-600"><strong>Customer Name:</strong> {orderDetails.customer.username.toUpperCase()}</p>
                    <p className="text-gray-600"><strong>Customer Address:</strong> {orderDetails.customer.address}</p>
                    <p className="text-gray-600"><strong>Customer City:</strong> {orderDetails.customer.city}</p>
                    <p className="text-gray-600"><strong>Customer State:</strong> {orderDetails.customer.state}</p>
                    <p className="text-gray-600"><strong>Customer Mobile Number:</strong> {orderDetails.customer.phone}</p>
                    <p className="text-gray-600"><strong>Customer Email:</strong> {orderDetails.customer.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Items</h3>
              {orderItems.length === 0 ? (
                <p className="text-center text-gray-600">No items found for this order.</p>
              ) : (
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Product</th>
                      <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Quantity</th>
                      <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Unit Price</th>
                      <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item.product.productId} className="border-b border-gray-200">
                        <td className="border border-gray-300 px-6 py-4 flex items-center">
                          {item.product.imageUrl && (
                            <img
                              src={`data:image/jpeg;base64,${item.product.imageUrl}`}
                              alt={item.product.productName}
                              className="w-12 h-12 object-cover rounded-md mr-4"
                            />
                          )}
                          {item.product.productName}
                        </td>
                        <td className="border border-gray-300 px-6 py-4 text-gray-600">{item.quantity}</td>
                        <td className="border border-gray-300 px-6 py-4 text-gray-600">Rs.{item.product.price.toFixed(2)}</td>
                        <td className="border border-gray-300 px-6 py-4 text-gray-800">Rs.{(item.product.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="border border-gray-300 px-6 py-4 text-right text-gray-700 font-semibold">Total:</td>
                      <td className="border border-gray-300 px-6 py-4 text-gray-800">Rs.{orderDetails.totalAmount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-between invoice-buttons">
              <button
                onClick={handleBackToOrderView}
                className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition-colors duration-200"
              >
                Back to Order View
              </button>
              <button
                onClick={handleDownloadPDF}
                className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition-colors duration-200"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
