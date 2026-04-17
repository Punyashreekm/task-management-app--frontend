import React from 'react';
import { useAppSelector } from '../store/hooks';
import TaskItem from './TaskItem';
import type { TaskFilterOptions } from '../types';
import { FiInbox } from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';

interface TaskListProps {
  filters: TaskFilterOptions;
}

const TaskList: React.FC<TaskListProps> = ({ filters }) => {
  const { tasks } = useAppSelector((state) => state.tasks);

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters.searchQuery, filters.statusFilter, filters.priorityFilter]);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesStatus = filters.statusFilter === 'All' || task.status === filters.statusFilter;
    const matchesPriority = filters.priorityFilter === 'All' || task.priority === filters.priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + itemsPerPage);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-500">
        <div className="bg-slate-800/50 p-6 rounded-full mb-4">
          <FiInbox className="text-5xl text-slate-600" />
        </div>
        <h3 className="text-xl font-medium text-slate-300 mb-1">No tasks found</h3>
        <p>You have a clean slate! Add a task to get started.</p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-500">
        <FiInbox className="text-4xl mb-4 opacity-50" />
        <h3 className="text-lg font-medium text-slate-400">No tasks match your filters.</h3>
        <p className="text-sm mt-1">Try adjusting your search or filter settings.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-4 flex-1">
        <AnimatePresence mode="popLayout">
          {paginatedTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between border-t border-slate-700/50 pt-4">
          <div className="text-sm text-slate-400">
            Showing <span className="font-semibold text-slate-200">{startIndex + 1}</span> to <span className="font-semibold text-slate-200">{Math.min(startIndex + itemsPerPage, filteredTasks.length)}</span> of <span className="font-semibold text-slate-200">{filteredTasks.length}</span> tasks
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === i + 1
                      ? 'bg-indigo-500 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
