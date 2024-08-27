import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';
import { HiArrowLeft, HiPencil } from 'react-icons/hi';
import { motion } from 'framer-motion';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:6789/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (!product) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />
      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />
        <div className="max-w-4xl mx-auto p-6">
          <motion.h1
            className="text-4xl font-bold mb-6 text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Product Details
          </motion.h1>
          <motion.table
            className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <tbody>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-4 text-left text-gray-600">Product ID</th>
                <td className="border border-gray-300 p-4 text-gray-800">{product.productId}</td>
              </tr>
              <tr>
                <th className="border border-gray-300 p-4 text-left text-gray-600">Name</th>
                <td className="border border-gray-300 p-4 text-gray-800">{product.productName}</td>
              </tr>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-4 text-left text-gray-600">Description</th>
                <td className="border border-gray-300 p-4 text-gray-800">{product.description}</td>
              </tr>
              <tr>
                <th className="border border-gray-300 p-4 text-left text-gray-600">Price</th>
                <td className="border border-gray-300 p-4 text-gray-800">Rs.{product.price}</td>
              </tr>
              <tr>
                <th className="border border-gray-300 p-4 text-left text-gray-600">Category</th>
                <td className="border border-gray-300 p-4 text-gray-800">{product.categoryName}</td>
              </tr>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-4 text-left text-gray-600">Created At</th>
                <td className="border border-gray-300 p-4 text-gray-800">{new Date(product.createdAt).toLocaleString()}</td>
              </tr>
              <tr>
                <th className="border border-gray-300 p-4 text-left text-gray-600">Updated At</th>
                <td className="border border-gray-300 p-4 text-gray-800">{new Date(product.updatedAt).toLocaleString()}</td>
              </tr>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-4 text-left text-gray-600">Image</th>
                <td className="border border-gray-300 p-4 text-gray-800">
                  {product.imageUrl && (
                    <img
                      src={`data:image/jpeg;base64,${product.imageUrl}`}
                      alt={`Image of ${product.productName}`}
                      className="w-48 h-48 object-cover rounded-lg shadow-md"
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </motion.table>
          <div className="flex justify-between mt-8">
            <button
              onClick={handleGoBack}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition duration-300 flex items-center"
            >
              <HiArrowLeft className="mr-2 text-xl" /> Go Back
            </button>
            <Link
              to={`/productedit/${product.productId}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <HiPencil className="mr-2 text-xl" /> Edit Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
