import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dummy Data
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    photo: "https://via.placeholder.com/50",
    posts: 25,
    reach: "10K",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    photo: "https://via.placeholder.com/50",
    posts: 18,
    reach: "8K",
  },
  {
    id: 3,
    name: "Alice Brown",
    email: "alice@example.com",
    photo: "https://via.placeholder.com/50",
    posts: 30,
    reach: "12K",
  },
];

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const followers = Object.keys(user.followers).length;
  const following = Object.keys(user.following).length;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* User Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <img 
          src={user.avatar} 
          alt="Profile" 
          className="h-32 w-32 rounded-full object-cover border-4 border-green-500 shadow-lg"
        />
        <div className="mt-4 text-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">
              <span className="text-green-600">User:</span> {user.username}
            </h3>
            <h3 className="text-xl font-semibold mt-2">
              <span className="text-green-600">Email:</span> {user.email}
            </h3>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-xl p-6 text-center">
          <h3 className="text-2xl font-medium text-gray-700">Followers</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">{followers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-xl p-6 text-center">
          <h3 className="text-2xl font-medium text-gray-700">Following</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">{following}</p>
        </div>
      </div>

      {/* Friends Table */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Friends</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posts</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reach</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img 
                        src={user.photo} 
                        alt={user.name} 
                        className="h-10 w-10 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.posts}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.reach}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;