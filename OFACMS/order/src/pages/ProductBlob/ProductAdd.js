



import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';
import { HiArrowLeft, HiPlus, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

const ProductAdd = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTimestamp = new Date().toISOString();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stockQuantity', stockQuantity);
    formData.append('categoryName', categoryName);
    formData.append('createdAt', currentTimestamp);
    formData.append('updatedAt', currentTimestamp);
    if (image) {
      formData.append('imageUrl', image);
    }

    try {
      await axios.post('http://localhost:6789/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/productviewall');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleNextPage = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
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
            Add New Product
          </motion.h1>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {currentPage === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="productName">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="price">Price</label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                    required
                  />
                </div>
              </>
            )}
            {currentPage === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="stockQuantity">Stock Quantity</label>
                  <input
                    type="number"
                    id="stockQuantity"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="categoryName">Category</label>
                  <input
                    type="text"
                    id="categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="imageUrl">Image</label>
                  <input
                    type="file"
                    id="imageUrl"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full border border-gray-300 p-3 rounded-lg"
                  />
                </div>
              </>
            )}
            <div className="flex justify-between items-center mt-6">
              {currentPage === 2 && (
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition duration-300 flex items-center"
                >
                  <HiChevronLeft className="mr-2" /> Previous
                </button>
              )}
              {currentPage === 1 && (
                <button
                  type="button"
                  onClick={handleNextPage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                >
                  <HiChevronRight className="mr-2" /> Next
                </button>
              )}
              {currentPage === 2 && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                >
                  <HiPlus className="mr-2" /> Add Product
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={handleGoBack}
              className="mt-4 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition duration-300 flex items-center"
            >
              <HiArrowLeft className="mr-2" /> Go to Product DashBoard
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
