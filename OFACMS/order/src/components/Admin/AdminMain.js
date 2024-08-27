import React from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { FaUsers, FaFileAlt, FaBox, FaChartLine, FaShoppingCart } from "react-icons/fa"; // Importing icons
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from "chart.js";

// Registering the Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
);

const AdminMain = () => {
  // Dummy data for charts
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [30, 45, 60, 70, 55, 90],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.1, // Smooth lines
      },
    ],
  };

  const barData = {
    labels: ["Laptops", "Mobiles", "Refridgerator", "Washing Machine"],
    datasets: [
      {
        label: "Orders",
        data: [120, 150, 80, 200],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Active", "Inactive", "Pending"],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-6">
        <AdminNavbar />
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <FaUsers className="text-2xl text-teal-600 mr-2" />
                <h2 className="text-xl font-semibold">User Management</h2>
              </div>
              <p>Manage users, roles, and permissions.</p>
              <Link
                to="/customerviewall"
                className="text-blue-600 hover:underline"
              >
                View Users
              </Link>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <FaUsers className="text-2xl text-teal-600 mr-2" />{" "}
                {/* Updated icon */}
                <h2 className="text-xl font-semibold">Employee Management</h2>
              </div>
              <p>Track and manage employees.</p>
              <Link
                to="/adminuserviewall"
                className="text-blue-600 hover:underline"
              >
                View Employees
              </Link>{" "}
              {/* Updated link text */}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <FaFileAlt className="text-2xl text-teal-600 mr-2" />
                <h2 className="text-xl font-semibold">Audit Management</h2>
              </div>
              <p>Manage the Audits of Employees.</p>
              <Link
                to="/auditlogviewall"
                className="text-blue-600 hover:underline"
              >
                View All Audits
              </Link>
            </div>
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-teal-800">
              Analytics
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-gray-50 p-4 rounded-lg shadow-md flex-1">
                <h3 className="text-lg font-semibold mb-4">Sales Over Time</h3>
                <div className="h-72">
                  <Line
                    data={lineData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-md flex-1">
                <h3 className="text-lg font-semibold mb-4">
                  Order Distribution
                </h3>
                <div className="h-72">
                  <Bar
                    data={barData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-md flex-1">
                <h3 className="text-lg font-semibold mb-4">User Status</h3>
                <div className="h-72">
                  <Pie
                    data={pieData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gradient-to-b from-teal-700 to-teal-900 p-4 text-white text-center rounded-b-lg rounded-t-lg mt-6">
          &copy; {new Date().getFullYear()} Nandha Mart. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminMain;

