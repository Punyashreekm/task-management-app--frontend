import React from 'react';
import type { TaskFilterOptions } from '../types';
import { FiSearch, FiFilter } from 'react-icons/fi';

interface TaskFiltersProps {
  filters: TaskFilterOptions;
  onFilterChange: (filters: TaskFilterOptions) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white/80 border border-slate-200/80 shadow-sm rounded-2xl p-6 backdrop-blur-sm space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <FiFilter className="text-blue-500" />
        <h3 className="font-semibold text-slate-800">Filters & Search</h3>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search items..."
          value={filters.searchQuery}
          onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
          className="w-full bg-white border border-slate-300 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 font-medium">Status</label>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['All', 'Pending', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => onFilterChange({ ...filters, statusFilter: status as any })}
                className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all ${
                  filters.statusFilter === status 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
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
                    ? 'bg-blue-50 border-blue-200 text-blue-700' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
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
