import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authSlice';
import { FiMenu, FiBell, FiSettings } from 'react-icons/fi';
import { BsSearch } from 'react-icons/bs';
import Button from './Button';

const Navbar = () => {
  const { user, isSidebarOpen } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => dispatch(setOpenSidebar(!isSidebarOpen))}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center">
            <div className="relative">
              <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks, users..."
                className="pl-10 pr-4 py-2 w-64 lg:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button
            icon={<FiBell />}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => {}}
          >
            {/* Notification Badge */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* Settings */}
          <Button
            icon={<FiSettings />}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => {}}
          />

          {/* User Avatar */}
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role || 'Member'}
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;