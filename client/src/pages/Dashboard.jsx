import React, { useState, useEffect } from "react";
import { summary } from "../assets/data";
import { IoMdAdd } from "react-icons/io";
import { FaUsers, FaTasks } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { LuClipboardCheck } from "react-icons/lu";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  // Mock task statistics - in real app this would come from API
  const [stats, setStats] = useState({
    totalTasks: 0,
    completed: 0,
    inProgress: 0,
    todo: 0
  });

  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    // Mock data calculation
    const tasks = summary.last10Task || [];
    const totalTasks = tasks.length;
    const completed = tasks.filter(task => task.stage === 'completed').length;
    const inProgress = tasks.filter(task => task.stage === 'in-progress').length;
    const todo = tasks.filter(task => task.stage === 'todo').length;
    
    setStats({
      totalTasks,
      completed,
      inProgress,
      todo
    });
    
    setRecentTasks(tasks.slice(0, 5));
  }, []);

  const statsCards = [
    {
      title: "Total Tasks",
      count: stats.totalTasks,
      icon: <FaTasks className="text-3xl text-blue-600" />,
      bg: "bg-blue-100"
    },
    {
      title: "Completed",
      count: stats.completed,
      icon: <LuClipboardCheck className="text-3xl text-green-600" />,
      bg: "bg-green-100"
    },
    {
      title: "In Progress", 
      count: stats.inProgress,
      icon: <MdPendingActions className="text-3xl text-orange-600" />,
      bg: "bg-orange-100"
    },
    {
      title: "To Do",
      count: stats.todo,
      icon: <FaTasks className="text-3xl text-gray-600" />,
      bg: "bg-gray-100"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'todo':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
        </div>
        <Button
          icon={<IoMdAdd />}
          label="New Task"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => navigate('/tasks')}
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bg} p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.count}</p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
          <Button
            label="View All"
            className="text-blue-600 hover:text-blue-700 text-sm"
            onClick={() => navigate('/tasks')}
          />
        </div>
        
        {recentTasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No recent tasks found</p>
            <Button
              label="Create Your First Task"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => navigate('/tasks')}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-md hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/task/${task._id}`)}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Due: {new Date(task.date).toLocaleDateString()}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>Team: {task.team?.length || 0} members</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.stage)}`}>
                    {task.stage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;