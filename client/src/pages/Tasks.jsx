import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { summary } from "../assets/data";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { toast } from "sonner";

const Tasks = () => { 
  const { status } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(status || "all");

  // Initialize tasks from data
  useEffect(() => {
    const allTasks = summary.last10Task || [];
    setTasks(allTasks);
  }, []);

  // Filter tasks based on status and search
  useEffect(() => {
    let filtered = tasks.filter(task => !task.isTrashed);
    
    if (selectedStatus !== "all") {
      filtered = filtered.filter(task => task.stage === selectedStatus);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.priority.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredTasks(filtered);
  }, [tasks, selectedStatus, searchTerm]);

  const statusOptions = [
    { value: "all", label: "All Tasks" },
    { value: "todo", label: "To Do" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" }
  ];

  const priorityColors = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-green-100 text-green-700 border-green-200",
    normal: "bg-blue-100 text-blue-700 border-blue-200"
  };

  const statusColors = {
    todo: "bg-gray-100 text-gray-700 border-gray-200",
    "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-green-100 text-green-700 border-green-200"
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task._id === taskId ? { ...task, isTrashed: true } : task
    );
    setTasks(updatedTasks);
    toast.success("Task moved to trash");
  };

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => 
      task._id === taskId ? { ...task, stage: newStatus } : task
    );
    setTasks(updatedTasks);
    toast.success(`Task status updated to ${newStatus}`);
  };

  const TaskCard = ({ task }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600"
              onClick={() => navigate(`/task/${task._id}`)}>
            {task.title}
          </h3>
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority] || priorityColors.normal}`}>
              {task.priority}
            </span>
            <select
              value={task.stage}
              onChange={(e) => handleStatusChange(task._id, e.target.value)}
              className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[task.stage] || statusColors.todo}`}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setEditingTask(task)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            <FiEdit size={16} />
          </button>
          <button
            onClick={() => handleDeleteTask(task._id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-2">
        <p>Due: {new Date(task.date).toLocaleDateString()}</p>
        <p>Team: {task.team?.length || 0} members</p>
        {task.subTasks && (
          <p>Subtasks: {task.subTasks.length}</p>
        )}
      </div>
      
      {task.team && task.team.length > 0 && (
        <div className="flex -space-x-2 overflow-hidden">
          {task.team.slice(0, 3).map((member, idx) => (
            <div
              key={idx}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-white text-xs font-medium ring-2 ring-white"
              title={member.name}
            >
              {member.name.charAt(0).toUpperCase()}
            </div>
          ))}
          {task.team.length > 3 && (
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-600 text-xs font-medium ring-2 ring-white">
              +{task.team.length - 3}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {selectedStatus === "all" ? "All Tasks" : 
             selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1).replace("-", " ")} 
            ({filteredTasks.length})
          </h1>
        </div>
        <Button
          icon={<IoMdAdd />}
          label="Add Task"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => setShowAddModal(true)}
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex items-center space-x-4">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedStatus(option.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedStatus === option.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No tasks found</p>
          <Button
            icon={<IoMdAdd />}
            label="Add Your First Task"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => setShowAddModal(true)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}

      {/* Add/Edit Task Modal would go here */}
      {showAddModal && (
        <TaskModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={(newTask) => {
            const taskWithId = {
              ...newTask,
              _id: Date.now().toString(),
              createdAt: new Date().toISOString(),
              team: [],
              activities: [],
              subTasks: [],
              isTrashed: false
            };
            setTasks([...tasks, taskWithId]);
            setShowAddModal(false);
            toast.success("Task created successfully");
          }}
        />
      )}

      {editingTask && (
        <TaskModal
          isOpen={true}
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(updatedTask) => {
            const updatedTasks = tasks.map(task =>
              task._id === editingTask._id ? { ...task, ...updatedTask } : task
            );
            setTasks(updatedTasks);
            setEditingTask(null);
            toast.success("Task updated successfully");
          }}
        />
      )}
    </div>
  );
}

// Task Modal Component
const TaskModal = ({ isOpen, task = null, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    priority: task?.priority || "normal",
    stage: task?.stage || "todo",
    date: task?.date ? new Date(task.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Task title is required");
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold mb-4">
          {task ? "Edit Task" : "Add New Task"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.stage}
              onChange={(e) => setFormData({...formData, stage: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              label={task ? "Update Task" : "Add Task"}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            />
            <Button
              label="Cancel"
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
              onClick={onClose}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tasks;