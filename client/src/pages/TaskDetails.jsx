import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { summary } from '../assets/data';
import Button from '../components/Button';
import { FiArrowLeft, FiEdit, FiTrash2 } from 'react-icons/fi';
import { BiCalendar, BiUser } from 'react-icons/bi';
import { MdPriorityHigh } from 'react-icons/md';
import { toast } from 'sonner';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [newSubtask, setNewSubtask] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Find task from data
    const foundTask = summary.last10Task?.find(t => t._id === id);
    if (foundTask) {
      setTask(foundTask);
    } else {
      toast.error('Task not found');
      navigate('/tasks');
    }
  }, [id, navigate]);

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    
    const subtask = {
      _id: Date.now().toString(),
      title: newSubtask,
      date: new Date().toISOString(),
      tag: 'general',
      completed: false
    };
    
    setTask(prev => ({
      ...prev,
      subTasks: [...(prev.subTasks || []), subtask]
    }));
    
    setNewSubtask('');
    toast.success('Subtask added');
  };

  const toggleSubtaskComplete = (subtaskId) => {
    setTask(prev => ({
      ...prev,
      subTasks: prev.subTasks.map(st => 
        st._id === subtaskId ? { ...st, completed: !st.completed } : st
      )
    }));
  };

  const deleteSubtask = (subtaskId) => {
    setTask(prev => ({
      ...prev,
      subTasks: prev.subTasks.filter(st => st._id !== subtaskId)
    }));
    toast.success('Subtask deleted');
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'todo':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!task) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading task details...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            icon={<FiArrowLeft />}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            onClick={() => navigate('/tasks')}
          />
          <h1 className="text-2xl font-semibold text-gray-900">Task Details</h1>
        </div>
        <div className="flex gap-2">
          <Button
            icon={<FiEdit />}
            label="Edit"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => setIsEditing(true)}
          />
          <Button
            icon={<FiTrash2 />}
            label="Delete"
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={() => {
              toast.success('Task deleted');
              navigate('/tasks');
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Info Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{task.title}</h2>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(task.priority)}`}>
                <MdPriorityHigh className="inline mr-1" />
                {task.priority} Priority
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.stage)}`}>
                {task.stage?.replace('-', ' ')}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
                <BiCalendar className="inline mr-1" />
                Due: {new Date(task.date).toLocaleDateString()}
              </span>
            </div>

            {/* Assets */}
            {task.assets && task.assets.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Attachments</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {task.assets.map((asset, idx) => (
                    <div key={idx} className="relative">
                      <img 
                        src={asset} 
                        alt={`Attachment ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-md border border-gray-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Subtasks */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-4">
              Subtasks ({task.subTasks?.length || 0})
            </h3>
            
            {/* Add Subtask Form */}
            <form onSubmit={handleAddSubtask} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                placeholder="Add a new subtask..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Button
                type="submit"
                label="Add"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              />
            </form>

            {/* Subtask List */}
            <div className="space-y-2">
              {task.subTasks?.map((subtask) => (
                <div key={subtask._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                  <input
                    type="checkbox"
                    checked={subtask.completed || false}
                    onChange={() => toggleSubtaskComplete(subtask._id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className={`flex-1 ${subtask.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {subtask.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(subtask.date).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => deleteSubtask(subtask._id)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
              
              {(!task.subTasks || task.subTasks.length === 0) && (
                <p className="text-gray-500 text-center py-4">No subtasks yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team Members */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-4">
              <BiUser className="inline mr-2" />
              Team Members ({task.team?.length || 0})
            </h3>
            
            {task.team?.length > 0 ? (
              <div className="space-y-3">
                {task.team.map((member) => (
                  <div key={member._id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.title}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      member.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                      member.role === 'Manager' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No team members assigned</p>
            )}
          </div>

          {/* Task Statistics */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-4">Task Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="text-gray-900">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="text-gray-900">
                  {new Date(task.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subtasks:</span>
                <span className="text-gray-900">
                  {task.subTasks?.filter(st => st.completed).length || 0} / {task.subTasks?.length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Activities:</span>
                <span className="text-gray-900">{task.activities?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;