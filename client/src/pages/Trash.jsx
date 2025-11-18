import React, { useState, useEffect } from 'react';
import { summary } from '../assets/data';
import Button from '../components/Button';
import { FiSkipBack, FiTrash2, FiRefreshCw } from "react-icons/fi";
import { BsSearch } from 'react-icons/bs';
import { toast } from 'sonner';

const Trash = () => {
  const [trashedTasks, setTrashedTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    // Mock trashed tasks - in real app these would come from API
    const trashed = summary.last10Task?.map((task, index) => ({
      ...task,
      _id: `trash_${index}`,
      isTrashed: true,
      trashedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    })).slice(0, 3) || [];
    
    setTrashedTasks(trashed);
  }, []);

  useEffect(() => {
    let filtered = trashedTasks;
    if (searchTerm) {
      filtered = trashedTasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.priority.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredTasks(filtered);
  }, [trashedTasks, searchTerm]);

  const handleRestore = (taskId) => {
    const restoredTask = trashedTasks.find(t => t._id === taskId);
    setTrashedTasks(trashedTasks.filter(t => t._id !== taskId));
    toast.success(`"${restoredTask?.title}" restored successfully`);
  };

  const handlePermanentDelete = (taskId) => {
    const deletedTask = trashedTasks.find(t => t._id === taskId);
    setTrashedTasks(trashedTasks.filter(t => t._id !== taskId));
    toast.success(`"${deletedTask?.title}" permanently deleted`);
  };

  const handleRestoreSelected = () => {
    if (selectedTasks.length === 0) {
      toast.error('Please select tasks to restore');
      return;
    }
    
    setTrashedTasks(trashedTasks.filter(t => !selectedTasks.includes(t._id)));
    toast.success(`${selectedTasks.length} task(s) restored successfully`);
    setSelectedTasks([]);
  };

  const handleDeleteSelected = () => {
    if (selectedTasks.length === 0) {
      toast.error('Please select tasks to delete');
      return;
    }
    
    setTrashedTasks(trashedTasks.filter(t => !selectedTasks.includes(t._id)));
    toast.success(`${selectedTasks.length} task(s) permanently deleted`);
    setSelectedTasks([]);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedTasks(filteredTasks.map(t => t._id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleSelectTask = (taskId, checked) => {
    if (checked) {
      setSelectedTasks([...selectedTasks, taskId]);
    } else {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    }
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

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Trash</h1>
          <p className="text-gray-600">
            Deleted tasks ({filteredTasks.length}) • Items in trash are automatically deleted after 30 days
          </p>
        </div>
        {selectedTasks.length > 0 && (
          <div className="flex gap-2">
            <Button
              icon={<FiSkipBack />}
              label={`Restore (${selectedTasks.length})`}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              onClick={handleRestoreSelected}
            />
            <Button
              icon={<FiTrash2 />}
              label={`Delete (${selectedTasks.length})`}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              onClick={handleDeleteSelected}
            />
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="relative max-w-md">
          <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search trashed tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <FiTrash2 className="mx-auto text-gray-400 text-4xl mb-4" />
          <p className="text-gray-500 mb-4">Trash is empty</p>
          <p className="text-sm text-gray-400">Deleted tasks will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Header with Select All */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label className="ml-3 text-sm font-medium text-gray-700">
                Select all tasks ({filteredTasks.length})
              </label>
            </div>
          </div>

          {/* Task List */}
          <div className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <div key={task._id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task._id)}
                    onChange={(e) => handleSelectTask(task._id, e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          icon={<FiSkipBack />}
                          label="Restore"
                          className="flex items-center gap-1 text-green-600 hover:bg-green-50 px-3 py-1 rounded-md text-sm"
                          onClick={() => handleRestore(task._id)}
                        />
                        <Button
                          icon={<FiTrash2 />}
                          label="Delete"
                          className="flex items-center gap-1 text-red-600 hover:bg-red-50 px-3 py-1 rounded-md text-sm"
                          onClick={() => handlePermanentDelete(task._id)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                        {task.priority} Priority
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.stage)}`}>
                        {task.stage?.replace('-', ' ')}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        Due: {new Date(task.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>Team: {task.team?.length || 0} members</span>
                        <span>Subtasks: {task.subTasks?.length || 0}</span>
                      </div>
                      <span>
                        Deleted: {new Date(task.trashedAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Team Members Preview */}
                    {task.team && task.team.length > 0 && (
                      <div className="flex -space-x-2 overflow-hidden mt-3">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty Trash Button */}
      {filteredTasks.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Button
            icon={<FiRefreshCw />}
            label="Empty Trash"
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
            onClick={() => {
              setTrashedTasks([]);
              setSelectedTasks([]);
              toast.success('Trash emptied successfully');
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Trash;