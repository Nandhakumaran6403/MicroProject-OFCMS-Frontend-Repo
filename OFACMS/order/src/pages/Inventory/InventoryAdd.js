



// src/pages/InventoryAdd.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus } from 'react-icons/fa'; // Icons for Go Back and Add
import EmployeeSidebar from '../../components/Employee/EmployeeSidebar';
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';

const InventoryAdd = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [inventory, setInventory] = useState({
    productId: '',
    warehouseId: '',
    quantity: '',
    lastUpdated: new Date().toISOString() // Initialize with current date and time
  });
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchProducts();
    fetchWarehouses();
  }, []);

  const handleProductChange = (e) => {
    const productName = e.target.value;
    const selectedProduct = products.find(product => product.productName === productName);

    if (selectedProduct) {
      setInventory(prev => ({
        ...prev,
        productId: selectedProduct.productId
      }));
    } else {
      setInventory(prev => ({
        ...prev,
        productId: ''
      }));
    }
  };

  const handleWarehouseChange = (e) => {
    const warehouseName = e.target.value;
    const selectedWarehouse = warehouses.find(warehouse => warehouse.warehouseName === warehouseName);

    if (selectedWarehouse) {
      setInventory(prev => ({
        ...prev,
        warehouseId: selectedWarehouse.warehouseId
      }));
    } else {
      setInventory(prev => ({
        ...prev,
        warehouseId: ''
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventory(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:6789/inventory', {
        product: { productId: inventory.productId },
        warehouse: { warehouseId: inventory.warehouseId },
        quantity: inventory.quantity,
        lastUpdated: inventory.lastUpdated
      });
      navigate('/inventoryviewall'); // Redirect to inventory list
    } catch (err) {
      setError('Failed to add inventory');
      console.error(err);
    }
  };

  const handleGoBack = () => {
    navigate('/inventoryviewall');
  };

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />

        <div className="flex items-center justify-center py-12">
          <div className="container bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
           
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2" htmlFor="product">Product</label>
                <select
                  id="product"
                  name="product"
                  value={products.find(product => product.productId === inventory.productId)?.productName || ''}
                  onChange={handleProductChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  required
                >
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product.productId} value={product.productName}>
                      {product.productName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2" htmlFor="warehouse">Warehouse</label>
                <select
                  id="warehouse"
                  name="warehouse"
                  value={warehouses.find(warehouse => warehouse.warehouseId === inventory.warehouseId)?.warehouseName || ''}
                  onChange={handleWarehouseChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  required
                >
                  <option value="">Select Warehouse</option>
                  {warehouses.map(warehouse => (
                    <option key={warehouse.warehouseId} value={warehouse.warehouseName}>
                      {warehouse.warehouseName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2" htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={inventory.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2" htmlFor="lastUpdated">Last Updated</label>
                <input
                  type="datetime-local"
                  id="lastUpdated"
                  name="lastUpdated"
                  value={inventory.lastUpdated.slice(0, 16)} // Format to match datetime-local input value
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  readOnly
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={handleGoBack}
                  className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  <FaArrowLeft className="mr-2 text-xl" />
                  <span className="font-semibold">Go Back</span>
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-600 transition-colors duration-200"
                  onClick={handleSubmit}
                >
                  <FaPlus className="mr-2 text-xl" />
                  <span className="font-semibold">Add Inventory</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryAdd;
