import React, { useState } from 'react';
import type { Task } from '../types';
import { useUpdateTaskMutation, useDeleteTaskMutation } from '../store/apiSlice';
import { FiCheckCircle, FiCircle, FiTrash2, FiEdit2, FiClock } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

interface TaskItemProps {
  task: Task;
}

const priorityColors = {
  High: 'bg-rose-50 text-rose-700 border-rose-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleToggleStatus = () => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    // Optimistic-like UI: we just dispatch and let Redux handle it
    updateTask({ ...task, status: newStatus })
      .unwrap()
      .then(() => toast.success(`Task marked as ${newStatus}`, { icon: newStatus === 'Completed' ? '👏' : '⏳' }))
      .catch(() => toast.error('Failed to update task'));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id)
        .unwrap()
        .then(() => toast.success('Task deleted'))
        .catch(() => toast.error('Failed to delete task'));
    }
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      toast.error('Title cannot be empty');
      return;
    }
    updateTask({ ...task, title: editTitle })
      .unwrap()
      .then(() => {
        setIsEditing(false);
        toast.success('Task updated');
      })
      .catch(() => toast.error('Failed to update task'));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className={`group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl border transition-all ${
        task.status === 'Completed' 
          ? 'bg-slate-50 border-slate-200/50 opacity-60' 
          : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/5 shadow-sm'
      }`}
    >
      <button 
        onClick={handleToggleStatus}
        className={`flex-shrink-0 mt-1 sm:mt-0 text-2xl transition-colors ${
          task.status === 'Completed' ? 'text-emerald-500 hover:text-emerald-600' : 'text-slate-300 hover:text-blue-500'
        }`}
      >
        {task.status === 'Completed' ? <FiCheckCircle /> : <FiCircle />}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            autoFocus
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
            onBlur={handleSaveEdit}
            className="w-full bg-white border border-blue-500 rounded-lg px-3 py-1.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
          />
        ) : (
          <h3 className={`text-lg font-medium truncate transition-all duration-300 ${
            task.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-800'
          }`}>
            {task.title}
          </h3>
        )}
        
        <div className="flex items-center gap-3 mt-2 text-xs font-medium">
          <span className={`px-2.5 py-0.5 rounded-full border ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <FiClock />
            {task.createdAt 
              ? formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })
              : 'Recently'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity self-end sm:self-center">
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Task"
          >
            <FiEdit2 />
          </button>
        )}
        <button 
          onClick={handleDelete}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          title="Delete Task"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
