import React, { useState } from 'react';
import { useAddTaskMutation } from '../store/apiSlice';
import type { TaskPriority } from '../types';
import { toast } from 'react-hot-toast';
import { FiX } from 'react-icons/fi';

interface TaskFormProps {
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const [createTask] = useAddTaskMutation();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Task title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await createTask({ title: title.trim(), priority }).unwrap();
      toast.success('Task created successfully!');
      onClose();
    } catch (err) {
      toast.error('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden shadow-slate-200/50">
      <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-900">Create New Task</h2>
        <button 
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
        >
          <FiX />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
            Task Name
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            placeholder="E.g., Complete project proposal"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Priority Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['Low', 'Medium', 'High'] as TaskPriority[]).map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setPriority(p)}
                className={`py-2 px-3 rounded-xl text-sm font-medium border transition-all ${
                  priority === p
                    ? p === 'High' 
                      ? 'bg-rose-50 border-rose-200 text-rose-700'
                      : p === 'Medium'
                      ? 'bg-amber-50 border-amber-200 text-amber-700'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Create Task'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
