import React from 'react';
import { Link } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeNavbar from './EmployeeNavbar';
import { FaBoxOpen, FaChartLine, FaChartBar, FaChartPie } from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, BarElement, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, BarElement, ArcElement);

const StockLevelsPage = () => {
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Stock Levels Over Time',
        data: [50, 40, 60, 70, 65, 80],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ['Laptops', 'Mobiles', 'Refridgrator','Television', 'Washing machine', 'Air Conditioner'],
    datasets: [
      {
        label: 'Stock Levels by Category',
        data: [1200, 2000, 1800, 1500, 900, 100],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Laptops', 'Mobiles', 'Refridgrator', 'Television', 'Washing machine', 'Air Conditioner'],
    datasets: [
      {
        data: [20, 15, 15, 25, 20,5],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-600">
                <FaBoxOpen className="text-2xl mr-2" /> Inventory Add
              </h2>
              <p>Manage and add new inventory items.</p>
              <Link to="/inventoryadd" className="text-blue-600 hover:underline">Go to Inventory Add</Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-green-600">
                <FaChartLine className="text-2xl mr-2" /> Inventory Manage
              </h2>
              <p>View and manage existing inventory items.</p>
              <Link to="/inventoryviewall" className="text-green-600 hover:underline">Go to Inventory Manage</Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-yellow-600">
                <FaBoxOpen className="text-2xl mr-2" /> Warehouse Add
              </h2>
              <p>Add new warehouses to the system.</p>
              <Link to="/warehouseadd" className="text-yellow-600 hover:underline">Go to Warehouse Add</Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-red-600">
                <FaChartBar className="text-2xl mr-2" /> Warehouse Manage
              </h2>
              <p>Manage and view warehouse details.</p>
              <Link to="/warehouseviewall" className="text-red-600 hover:underline">Go to Warehouse Manage</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-600">
                <FaChartLine className="text-2xl mr-2" /> Stock Levels Over Time
              </h3>
              <div style={{ height: '300px' }}>
                <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600">
                <FaChartBar className="text-2xl mr-2" /> Stock Levels by Category
              </h3>
              <div style={{ height: '300px' }}>
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-yellow-600">
                <FaChartPie className="text-2xl mr-2" /> Stock Distribution
              </h3>
              <div style={{ height: '300px' }}>
                <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
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

export default StockLevelsPage;
