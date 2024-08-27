



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import { FaEye, FaEdit, FaTrashAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const AdministrativeUserViewAll = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);

  useEffect(() => {
    axios.get('http://localhost:6789/admin-users/all')
      .then(response => {
        setAdminUsers(response.data || []); // Ensure adminUsers is always an array
      })
      .catch(err => {
        setError('Error fetching administrative users');
        console.error('Error fetching administrative users:', err);
      });
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = adminUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(adminUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:6789/admin-users/${id}`)
        .then(() => {
          setAdminUsers(adminUsers.filter(user => user.adminUserId !== id));
        })
        .catch(err => {
          setError('Error deleting administrative user');
          console.error('Error deleting administrative user:', err);
        });
    }
  };

  if (error) return <div className="text-red-500 p-6">{error}</div>;
  if (!adminUsers.length) return <div className="text-center p-6">No administrative users found.</div>;

  return (
    <div className="flex min-h-screen ">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-6">
        <AdminNavbar />
        <div className="p-6 bg-white mt-5 rounded-lg ">
          <h1 className="text-3xl font-bold mb-6 text-teal-800">All Administrative Users</h1>
          <div className=" p-6 rounded-lg ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Login Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map(user => (
                  <tr key={user.adminUserId}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.adminUserId || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.userName ? user.userName.toUpperCase() : '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.email || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.role ? user.role.toUpperCase() : '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleDateString() : '-'}</td>
                    <td className="px-6 py-4 text-sm font-medium flex space-x-2">
                      <Link to={`/adminuserview/${user.adminUserId}`} className="text-indigo-600 hover:text-indigo-800 flex items-center">
                        <FaEye className="mr-1" /> View
                      </Link>
                      <Link to={`/adminuseredit/${user.adminUserId}`} className="text-yellow-600 hover:text-yellow-800 flex items-center">
                        <FaEdit className="mr-1" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user.adminUserId)}
                        className="text-red-600 hover:text-red-800 flex items-center"
                      >
                        <FaTrashAlt className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2"
              >
                <FaArrowLeft className="text-xl" />
              </button>

              <span className="flex items-center text-lg font-semibold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2"
              >
                <FaArrowRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdministrativeUserViewAll;
