import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { 
  FiHome, 
  FiList, 
  FiUsers, 
  FiTrash2, 
  FiLogOut,
  FiCheckCircle,
  FiClock,
  FiCircle 
} from 'react-icons/fi';
import { toast } from 'sonner';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/log-in');
  };

  const navItems = [
    {
      title: 'Dashboard',
      icon: FiHome,
      path: '/dashboard',
      active: location.pathname === '/dashboard'
    },
    {
      title: 'Tasks',
      icon: FiList,
      path: '/tasks',
      active: location.pathname === '/tasks',
      subItems: [
        {
          title: 'All Tasks',
          path: '/tasks',
          icon: FiList,
          active: location.pathname === '/tasks'
        },
        {
          title: 'To Do',
          path: '/todo/todo',
          icon: FiCircle,
          active: location.pathname.includes('/todo/')
        },
        {
          title: 'In Progress',
          path: '/in-progress/in-progress',
          icon: FiClock,
          active: location.pathname.includes('/in-progress/')
        },
        {
          title: 'Completed',
          path: '/completed/completed',
          icon: FiCheckCircle,
          active: location.pathname.includes('/completed/')
        }
      ]
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

  const NavItem = ({ item, isSubItem = false }) => {
    const IconComponent = item.icon;
    
    return (
      <button
        onClick={() => navigate(item.path)}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left rounded-lg transition-colors ${
          item.active 
            ? 'bg-blue-100 text-blue-700 border border-blue-200' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        } ${isSubItem ? 'ml-4 text-sm' : ''}`}
      >
        <IconComponent className={`${isSubItem ? 'w-4 h-4' : 'w-5 h-5'}`} />
        <span className="font-medium">{item.title}</span>
      </button>
    );
  };

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">TM</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">TaskManager</h1>
            <p className="text-xs text-gray-500">Manage your tasks</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item, index) => (
          <div key={index}>
            <NavItem item={item} />
            {item.subItems && (
              <div className="mt-1 space-y-1">
                {item.subItems.map((subItem, subIndex) => (
                  <NavItem key={subIndex} item={subItem} isSubItem={true} />
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-200">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3 p-2 rounded-lg bg-gray-50">
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
          className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;