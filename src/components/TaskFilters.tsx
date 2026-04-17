import React from 'react';
import type { TaskFilterOptions } from '../types';
import { FiSearch, FiFilter } from 'react-icons/fi';

interface TaskFiltersProps {
  filters: TaskFilterOptions;
  onFilterChange: (filters: TaskFilterOptions) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <FiFilter className="text-indigo-400" />
        <h3 className="font-semibold text-slate-200">Filters & Search</h3>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-slate-500" />
        </div>
        <input
          type="text"
          placeholder="Search items..."
          value={filters.searchQuery}
          onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 font-medium">Status</label>
          <div className="flex bg-slate-900 p-1 rounded-xl">
            {['All', 'Pending', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => onFilterChange({ ...filters, statusFilter: status as any })}
                className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all ${
                  filters.statusFilter === status 
                    ? 'bg-slate-700 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 font-medium">Priority</label>
          <div className="grid grid-cols-2 gap-2">
            {['All', 'High', 'Medium', 'Low'].map((priority) => (
              <button
                key={priority}
                onClick={() => onFilterChange({ ...filters, priorityFilter: priority as any })}
                className={`py-2 px-3 text-sm rounded-xl font-medium border transition-all ${
                  filters.priorityFilter === priority 
                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
