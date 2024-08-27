


import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';
import { HiEye, HiPencil, HiTrash, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

const ProductViewAll = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:6789/product/all');
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filtered products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const result = products.filter(product => {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      return (
        product.productName.toLowerCase().includes(lowercasedSearchTerm) ||
        product.categoryName.toLowerCase().includes(lowercasedSearchTerm)
      );
    });
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [searchTerm, products]);

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:6789/product/${productId}`);
        setProducts(products.filter(product => product.productId !== productId));
        setFilteredProducts(filteredProducts.filter(product => product.productId !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <EmployeeSidebar />
      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />
        <div className="max-w-6xl mx-auto p-6">
          <motion.h1
            className="text-4xl font-bold mb-6 text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            All Products
          </motion.h1>
          <div className="mb-6 flex items-center">
            <div className="flex-1 flex justify-between items-center">
              <Link
                to="/productadd"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                <HiPencil className="mr-2 text-xl" /> <span>Add Product</span>
              </Link>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search by product name or category"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border px-4 py-2 rounded-md w-80"
                />
              </div>
            </div>
          </div>
          <motion.table
            className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-3">Product ID</th>
                <th className="border border-gray-300 p-3">Name</th>
                <th className="border border-gray-300 p-3">Description</th>
                <th className="border border-gray-300 p-3">Price</th>
                <th className="border border-gray-300 p-3">Category</th>
                <th className="border border-gray-300 p-3">Created At</th>
                <th className="border border-gray-300 p-3">Updated At</th>
                <th className="border border-gray-300 p-3">Image</th>
                <th className="border border-gray-300 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.productId} className="even:bg-gray-100 transition-all duration-300 hover:bg-gray-200">
                  <td className="border border-gray-300 p-3">{product.productId}</td>
                  <td className="border border-gray-300 p-3">{product.productName}</td>
                  <td className="border border-gray-300 p-3">{product.description}</td>
                  <td className="border border-gray-300 p-3">Rs.{product.price}</td>
                  <td className="border border-gray-300 p-3">{product.categoryName}</td>
                  <td className="border border-gray-300 p-3">{new Date(product.createdAt).toLocaleString()}</td>
                  <td className="border border-gray-300 p-3">{new Date(product.updatedAt).toLocaleString()}</td>
                  <td className="border border-gray-300 p-3">
                    {product.imageUrl && (
                      <img
                        src={`data:image/jpeg;base64,${product.imageUrl}`}
                        alt={`Image of ${product.productName}`}
                        className="w-24 h-24 object-cover rounded-lg shadow-sm"
                      />
                    )}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex space-x-4">
                      <Link
                        to={`/productview/${product.productId}`}
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                      >
                        <HiEye className="mr-1 text-xl" /> View
                      </Link>
                      <Link
                        to={`/productedit/${product.productId}`}
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                      >
                        <HiPencil className="mr-1 text-xl" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.productId)}
                        className="text-red-500 hover:text-red-600 flex items-center"
                      >
                        <HiTrash className="mr-1 text-xl" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition duration-300 flex items-center disabled:opacity-50"
            >
              <HiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition duration-300 flex items-center disabled:opacity-50"
            >
              <HiChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewAll;
