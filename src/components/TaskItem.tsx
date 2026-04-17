import React, { useState } from 'react';
import type { Task } from '../types';
import { useAppDispatch } from '../store/hooks';
import { updateTask, deleteTask } from '../store/taskSlice';
import { FiCheckCircle, FiCircle, FiTrash2, FiEdit2, FiClock } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

interface TaskItemProps {
  task: Task;
}

const priorityColors = {
  High: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleToggleStatus = () => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    // Optimistic-like UI: we just dispatch and let Redux handle it
    dispatch(updateTask({ ...task, status: newStatus }))
      .unwrap()
      .then(() => toast.success(`Task marked as ${newStatus}`, { icon: newStatus === 'Completed' ? '👏' : '⏳' }))
      .catch(() => toast.error('Failed to update task'));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id))
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
    dispatch(updateTask({ ...task, title: editTitle }))
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
          ? 'bg-slate-800/20 border-slate-700/30 opacity-75' 
          : 'bg-slate-800/60 border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-indigo-500/5'
      }`}
    >
      <button 
        onClick={handleToggleStatus}
        className={`flex-shrink-0 mt-1 sm:mt-0 text-2xl transition-colors ${
          task.status === 'Completed' ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-500 hover:text-indigo-400'
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
            className="w-full bg-slate-900 border border-indigo-500 rounded-lg px-3 py-1.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        ) : (
          <h3 className={`text-lg font-medium truncate transition-all duration-300 ${
            task.status === 'Completed' ? 'line-through text-slate-500' : 'text-slate-200'
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
            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
            title="Edit Task"
          >
            <FiEdit2 />
          </button>
        )}
        <button 
          onClick={handleDelete}
          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
          title="Delete Task"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
