import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';
import { HiArrowLeft, HiSave } from 'react-icons/hi';
import { motion } from 'framer-motion';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:6789/product/${id}`);
        setProduct(response.data);
        setProductName(response.data.productName);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setStockQuantity(response.data.stockQuantity);
        setCategoryName(response.data.categoryName);
        if (response.data.imageUrl) {
          setImagePreview(`data:image/jpeg;base64,${response.data.imageUrl}`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stockQuantity', stockQuantity);
    formData.append('categoryName', categoryName);
    if (image) {
      formData.append('imageUrl', image);
    }

    try {
      const response = await axios.put(`http://localhost:6789/product/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data === 'UpdateSuccess') {
        navigate('/employeemain');
      } else {
        console.error('Update failed:', response.data);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!product) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
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
            Edit Product
          </motion.h1>
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="productName">Product Name</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">Description</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="price">Price</label>
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
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="stockQuantity">Stock Quantity</label>
                <input
                  type="number"
                  id="stockQuantity"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div> */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="categoryName">Category</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="imageUrl">Image</label>
                <input
                  type="file"
                  id="imageUrl"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="w-48 h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Created At</label>
                <input
                  type="text"
                  value={new Date(product.createdAt).toLocaleString()}
                  readOnly
                  className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition duration-300 flex items-center"
                >
                  <HiArrowLeft className="mr-2" /> Go Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                >
                  <HiSave className="mr-2" /> Update Product
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;


