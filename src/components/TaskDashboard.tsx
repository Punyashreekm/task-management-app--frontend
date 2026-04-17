import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTasks } from '../store/taskSlice';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';
import type { TaskFilterOptions } from '../types';
import { FiLoader, FiActivity } from 'react-icons/fi';

const TaskDashboard = () => {
  const dispatch = useAppDispatch();
  const { status, error, tasks } = useAppSelector((state) => state.tasks);

  const [filters, setFilters] = useState<TaskFilterOptions>({
    searchQuery: '',
    statusFilter: 'All',
    priorityFilter: 'All',
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  // Derived stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30 p-4 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3 text-indigo-400 mb-2">
              <FiActivity className="text-2xl" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Workspace</h2>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
              Task <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Dashboard</span>
            </h1>
            <p className="text-slate-400 text-lg">Manage your priorities efficiently.</p>
          </div>

          <div className="flex items-center gap-6 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{totalTasks}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Total</p>
            </div>
            <div className="w-px h-12 bg-slate-700"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-400">{completedTasks}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Done</p>
            </div>
            <div className="w-px h-12 bg-slate-700"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-cyan-400">{completionPercentage}%</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Progress</p>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls & Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <button
              onClick={() => setIsFormOpen(true)}
              className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <span className="text-xl group-hover:rotate-90 transition-transform">+</span>
              Create New Task
            </button>
            
            <TaskFilters filters={filters} onFilterChange={setFilters} />
          </aside>

          {/* Task List Area */}
          <main className="lg:col-span-9 bg-slate-800/30 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl">
            {status === 'loading' ? (
              <div className="flex flex-col items-center justify-center h-64 text-indigo-400">
                <FiLoader className="text-4xl animate-spin mb-4" />
                <p className="animate-pulse">Loading workspace...</p>
              </div>
            ) : status === 'failed' ? (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl text-center">
                <p className="font-semibold text-lg mb-2">Oops! Something went wrong.</p>
                <p>{error}</p>
              </div>
            ) : (
              <TaskList filters={filters} />
            )}
          </main>
        </div>

        {/* Create Task Modal/Form Overlay */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" 
              onClick={() => setIsFormOpen(false)}
            ></div>
            <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
              <TaskForm onClose={() => setIsFormOpen(false)} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TaskDashboard;
