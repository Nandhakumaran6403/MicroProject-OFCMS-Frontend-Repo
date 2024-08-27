import React from 'react';
import { Link } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeNavbar from './EmployeeNavbar';
import { FaBoxOpen, FaChartLine, FaChartBar, FaChartPie } from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, BarElement, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, BarElement, ArcElement);

const ProductsPage = () => {
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales Over Time',
        data: [15, 30, 45, 40, 55, 70],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ['Laptops', 'Mobiles', 'Refridgrator','Television', 'Washing machine', 'Air Conditioner'],
    datasets: [
      {
        label: 'Sales by Category',
        data: [1200, 2000, 1800, 1500, 900, 100],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['In Stock', 'Out of Stock', 'Low Stock'],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <EmployeeSidebar />

      <div className="flex-1 ml-64 p-6">
        <EmployeeNavbar />

        <main className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-teal-600 flex items-center">
                <FaChartLine className="text-2xl mr-2" /> Sales Over Time
              </h3>
              <div style={{ height: '300px' }}>
                <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-teal-600 flex items-center">
                <FaChartBar className="text-2xl mr-2" /> Sales by Category
              </h3>
              <div style={{ height: '300px' }}>
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-teal-600 flex items-center">
                <FaChartPie className="text-2xl mr-2" /> Stock Status
              </h3>
              <div style={{ height: '300px' }}>
                <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <div className="flex items-center mb-4">
                <FaBoxOpen className="text-2xl text-teal-600 mr-2" />
                <h2 className="text-xl font-semibold">Inventory Management</h2>
              </div>
              <p>View and manage your inventory efficiently.</p>
              <Link to="/inventoryviewall" className="text-teal-600 hover:underline">Inventory Manage</Link>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <div className="flex items-center mb-4">
                <FaBoxOpen className="text-2xl text-teal-600 mr-2" />
                <h2 className="text-xl font-semibold">Add Products</h2>
              </div>
              <p>Add new products to the inventory with ease.</p>
              <Link to="/productadd" className="text-teal-600 hover:underline">Add Products</Link>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <div className="flex items-center mb-4">
                <FaBoxOpen className="text-2xl text-teal-600 mr-2" />
                <h2 className="text-xl font-semibold">Product Management</h2>
              </div>
              <p>View and manage your existing products.</p>
              <Link to="/productviewall" className="text-teal-600 hover:underline">View All Products</Link>
            </div>
          </div>
        </main>

        <footer className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-white text-center rounded-lg mt-6">
          &copy; {new Date().getFullYear()} Nandha Mart. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default ProductsPage;
