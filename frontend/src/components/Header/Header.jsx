import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [isSideBar, setSideBar] = useState(false);
  const [isMobileSize, setMobileSize] = useState(false);
  const [moreOption, setMoreOption] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileSize(window.innerWidth < 480);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleBtnControll = () => {
    setSideBar(!isSideBar);
  };
  
  const hanlideSettingmob = () => {
    setMoreOption(!moreOption);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and main nav items */}
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-red-900">
                TipTrick.com
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink 
                  to="/" 
                  className={({isActive}) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive 
                        ? 'border-indigo-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/about" 
                  className={({isActive}) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive 
                        ? 'border-indigo-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  About
                </NavLink>
                <NavLink 
                  to="/device" 
                  className={({isActive}) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive 
                        ? 'border-indigo-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  Devices
                </NavLink>
                <NavLink 
                  to="/chat" 
                  className={({isActive}) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive 
                        ? 'border-indigo-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  Chat
                </NavLink>
              </div>
            </div>

            {/* Right side items */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {user ? (
                <>
                  
                  <div className="ml-3 relative">
                    <button 
                      onClick={hanlideSettingmob}
                      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <img 
                        className="h-8 w-8 rounded-full ml-4" 
                        src={user.avatar || "logo.jpg"} 
                        alt="User avatar" 
                      />
                    </button>
                    {moreOption && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <NavLink 
                          to="/dashboard" 
                          onClick={hanlideSettingmob}
                          className={({isActive}) => 
                            `block px-4 py-2 text-sm ${
                              isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            }`
                          }
                        >
                          Dashboard
                        </NavLink>
                        <NavLink 
                          to="/friends" 
                          onClick={hanlideSettingmob}
                          className={({isActive}) => 
                            `block px-4 py-2 text-sm ${
                              isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            }`
                          }
                        >
                          Friends
                        </NavLink>
                        <NavLink 
                          to="/mypost" 
                          onClick={hanlideSettingmob}
                          className={({isActive}) => 
                            `block px-4 py-2 text-sm ${
                              isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            }`
                          }
                        >
                          Posts
                        </NavLink>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <NavLink 
                  to="/auth" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </NavLink>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={toggleBtnControll}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isSideBar && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                onClick={toggleBtnControll}
                className={({isActive}) => 
                  `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive 
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                onClick={toggleBtnControll}
                className={({isActive}) => 
                  `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive 
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`
                }
              >
                About
              </NavLink>
              {user ? (
                <NavLink
                  to="/#"
                  onClick={toggleBtnControll}
                  className={({isActive}) => 
                    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                      isActive 
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  News
                </NavLink>
              ) : (
                <NavLink
                  to="/auth"
                  onClick={toggleBtnControll}
                  className={({isActive}) => 
                    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                      isActive 
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile user profile bar */}
      {isMobileSize && user && (
        <div className="flex items-center p-4 bg-white border-b shadow-sm">
          <img 
            src={user.avatar || "logo.jpg"} 
            alt="User avatar" 
            className="h-10 w-10 rounded-full mr-3" 
          />
          <div className="flex-1">
            <h5 className="font-medium text-gray-900">{user.username}</h5>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <button 
            onClick={hanlideSettingmob}
            className="p-2 rounded-full hover:bg-gray-100"
          >

          </button>
        </div>
      )}
    </>
  );
};

export default Header;