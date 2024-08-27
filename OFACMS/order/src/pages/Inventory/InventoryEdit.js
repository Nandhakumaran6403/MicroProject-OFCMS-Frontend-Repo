// src/pages/InventoryEdit.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa'; // Icons for Go Back and Save
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

const InventoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventory, setInventory] = useState(null);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`http://localhost:6789/inventory/${id}`);
        setInventory(response.data);
      } catch (err) {
        setError('Failed to fetch inventory');
        console.error(err);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:6789/product/all');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      }
    };

    const fetchWarehouses = async () => {
      try {
        const response = await axios.get('http://localhost:6789/warehouses/all');
        setWarehouses(response.data);
      } catch (err) {
        setError('Failed to fetch warehouses');
        console.error(err);
      }
    };

    fetchInventory();
    fetchProducts();
    fetchWarehouses();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set lastUpdated to current date and time before submitting
    const updatedInventory = {
      ...inventory,
      lastUpdated: new Date().toISOString()
    };

    try {
      await axios.put(`http://localhost:6789/inventory/${id}`, updatedInventory);
      navigate('/inventoryviewall'); // Redirect to inventory list
    } catch (err) {
      setError('Failed to update inventory');
      console.error(err);
    }
  };

  const handleGoBack = () => {
    navigate('/inventoryviewall');
  };

  if (!inventory) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />

        <div className=" py-12">
          <div className="container mx-auto max-w-lg bg-white p-8 rounded-lg shadow-lg">
           
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productId">Product</label>
                <select
                  id="productId"
                  name="productId"
                  value={inventory.productId || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  required
                >
                  {products.map(product => (
                    <option key={product.productId} value={product.productId}>
                      {product.productName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="warehouseId">Warehouse</label>
                <select
                  id="warehouseId"
                  name="warehouseId"
                  value={inventory.warehouseId || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  required
                >
                  {warehouses.map(warehouse => (
                    <option key={warehouse.warehouseId} value={warehouse.warehouseId}>
                      {warehouse.warehouseName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={inventory.quantity || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="lastUpdated">Last Updated</label>
                <input
                  type="datetime-local"
                  id="lastUpdated"
                  name="lastUpdated"
                  value={new Date().toISOString().slice(0, 16)} // Set to current date and time
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  readOnly
                />
              </div>
              <div className="flex items-center mt-6 justify-between mb-6">
              <button
                onClick={handleGoBack}
                className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2 text-xl" />
                Go Back
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600 transition-colors duration-200"
                onClick={handleSubmit}
              >
                <FaSave className="mr-2 text-xl" />
                Update Inventory
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryEdit;
