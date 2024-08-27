import React from 'react';
import { Link } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeNavbar from './EmployeeNavbar';
import { FaBoxOpen, FaTruck, FaShoppingCart, FaReceipt } from 'react-icons/fa'; 
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, BarElement, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, BarElement, ArcElement);

const EmployeeMain = () => {
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [10, 15, 20, 25, 18, 30],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ['High Priority', 'Medium Priority', 'Low Priority'],
    datasets: [
      {
        label: 'Task Distribution',
        data: [12, 25, 8],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Completed', 'Pending', 'Cancelled'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
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
            <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Tasks Completed</h3>
              <div style={{ height: '300px' }}>
                <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Task Distribution</h3>
              <div style={{ height: '300px' }}>
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Task Status</h3>
              <div style={{ height: '300px' }}>
                <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
              <div className="flex items-center mb-4">
                <FaBoxOpen className="text-2xl text-teal-600 mr-2" />
                <h2 className="text-xl font-semibold">Product Management</h2>
              </div>
              <p>Manage your products and monitor their status.</p>
              <Link to="/productspage" className="text-teal-600 hover:underline">View Inventory</Link>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
              <div className="flex items-center mb-4">
                <FaTruck className="text-2xl text-teal-600 mr-2" />
                <h2 className="text-xl font-semibold">Shipment Management</h2>
              </div>
              <p>Manage and track shipments efficiently.</p>
              <Link to="/shipmentspage" className="text-teal-600 hover:underline">View Shipments</Link>
            </div>

            <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl text-white">
              <div className="flex items-center mb-4">
                <FaShoppingCart className="text-3xl mr-2" />
                <h2 className="text-2xl font-semibold">Orders Management</h2>
              </div>
              <p>Manage and review your orders efficiently.</p>
              <Link to="/orderviewall" className="mt-2 inline-block text-teal-200 hover:underline">View Orders</Link>
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

export default EmployeeMain;
