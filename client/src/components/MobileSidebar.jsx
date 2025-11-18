import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setOpenSidebar } from '../redux/slices/authSlice';
import { 
  FiHome, 
  FiList, 
  FiUsers, 
  FiTrash2, 
  FiLogOut,
  FiX,
  FiCheckCircle,
  FiClock,
  FiCircle 
} from 'react-icons/fi';
import { toast } from 'sonner';

const MobileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isSidebarOpen } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setOpenSidebar(false));
    toast.success('Logged out successfully');
    navigate('/log-in');
  };

  const handleNavigation = (path) => {
    navigate(path);
    dispatch(setOpenSidebar(false));
  };

  const navItems = [
    {
      title: 'Dashboard',
      icon: FiHome,
      path: '/dashboard',
      active: location.pathname === '/dashboard'
    },
    {
      title: 'All Tasks',
      icon: FiList,
      path: '/tasks',
      active: location.pathname === '/tasks'
    },
    {
      title: 'To Do',
      icon: FiCircle,
      path: '/todo/todo',
      active: location.pathname.includes('/todo/')
    },
    {
      title: 'In Progress',
      icon: FiClock,
      path: '/in-progress/in-progress',
      active: location.pathname.includes('/in-progress/')
    },
    {
      title: 'Completed',
      icon: FiCheckCircle,
      path: '/completed/completed',
      active: location.pathname.includes('/completed/')
    },
    {
      title: 'Users',
      icon: FiUsers,
      path: '/users',
      active: location.pathname === '/users'
    },
    {
      title: 'Trash',
      icon: FiTrash2,
      path: '/trashed',
      active: location.pathname === '/trashed'
    }
  ];

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={() => dispatch(setOpenSidebar(false))}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TM</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">TaskManager</h1>
              </div>
            </div>
            <button
              onClick={() => dispatch(setOpenSidebar(false))}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-gray-200">
            {/* User Info */}
            <div className="flex items-center gap-3 mb-3 p-3 rounded-lg bg-gray-50">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.role || 'Member'}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;