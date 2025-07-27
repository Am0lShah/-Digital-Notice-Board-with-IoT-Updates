// components/Sidebar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [isSettingPanel, setSettingPanel] = useState(false);

  const dispatch = useDispatch();
  
  const signout = async () => {
    const res = await axios.post(`${import.meta.env.VITE_LOGOUT}`, {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 200) {
      dispatch(logout());
      window.location.reload();
    }
  };

  const settingHandler = () => {
    setSettingPanel(!isSettingPanel);
  };

  return (
    <div className="bg-white shadow-sm h-screen p-4 w-64 fixed">
      <div className="flex items-center mb-4">
        <div className="rounded-full bg-gray-200 mr-2 w-10 h-10 overflow-hidden">
          <img 
            className="w-full h-full object-cover" 
            src={user?.avatar} 
            alt="User avatar" 
          />
        </div>
        <div>
          <h5 className="font-medium text-gray-900 mb-0">{user?.username}</h5>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      </div>
      <hr className="my-2 border-gray-200" />
      
      <NavLink 
        to="/dashboard" 
        className={({isActive}) => 
          `block py-2 ${isActive ? "text-red-500" : "text-gray-700 hover:text-gray-900"}`
        }
      >
        Dashboard
      </NavLink>

      <ul className="space-y-1 mt-2">
        <li>
          <NavLink 
            to="/friends" 
            className={({isActive}) => 
              `block py-2 ${isActive ? "text-red-500" : "text-gray-700 hover:text-gray-900"}`
            }
          >
            Friends
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/mypost" 
            className={({isActive}) => 
              `block py-2 ${isActive ? "text-red-500" : "text-gray-700 hover:text-gray-900"}`
            }
          >
            Posts
          </NavLink>
        </li>
        {['Event', 'Watch Videos', 'Photos', 'Files', 'Marketplace'].map(item => (
          <li key={item} className="block py-2 text-blue-500 hover:text-blue-700">{item}</li>
        ))}
      </ul>

      <h6 className="font-bold mt-4 text-gray-900">Pages You Like</h6>
      <ul className="space-y-1 mt-2">
        {['Football FC', 'Badminton Club', 'UI/UX Community', 'Web Designer'].map(item => (
          <li key={item} className="block py-2 text-gray-700">
            {item} <span className="text-gray-400">(120)</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 relative">
        <button onClick={settingHandler} className="p-1 hover:bg-gray-100 rounded">
          <img src="gear.png" alt="setting" className="w-6 h-6" />
        </button>
        
        {isSettingPanel && (
          <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-900">Settings</h2>
            </div>
            <button 
              onClick={signout} 
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;