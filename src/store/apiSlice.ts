import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Task, TaskPriority } from '../types';
import { v4 as uuidv4 } from 'uuid';

const MOCK_DELAY = 800;

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // Dummy baseUrl since we use queryFn
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      async queryFn() {
        await delay(MOCK_DELAY);
        const saved = localStorage.getItem('tasks');
        if (saved) {
          return { data: JSON.parse(saved) as Task[] };
        }
        
        const initialData: Task[] = [
          { id: uuidv4(), title: 'Set up project repository', status: 'Completed', priority: 'High', createdAt: new Date().toISOString() },
          { id: uuidv4(), title: 'Design dashboard UI layout', status: 'Pending', priority: 'Medium', createdAt: new Date().toISOString() },
          { id: uuidv4(), title: 'Implement RTK Query state management', status: 'Pending', priority: 'High', createdAt: new Date().toISOString() },
        ];
        localStorage.setItem('tasks', JSON.stringify(initialData));
        return { data: initialData };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Task' as const, id })),
              { type: 'Task', id: 'LIST' },
            ]
          : [{ type: 'Task', id: 'LIST' }],
    }),
    
    addTask: builder.mutation<Task, { title: string; priority: TaskPriority }>({
      async queryFn(taskData) {
        await delay(MOCK_DELAY);
        const newTask: Task = {
          id: uuidv4(),
          title: taskData.title,
          status: 'Pending',
          priority: taskData.priority,
          createdAt: new Date().toISOString(),
        };
        
        const saved = localStorage.getItem('tasks');
        const tasks = saved ? JSON.parse(saved) : [];
        tasks.unshift(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        return { data: newTask };
      },
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
    
    updateTask: builder.mutation<Task, Task>({
      async queryFn(updatedTask) {
        await delay(MOCK_DELAY);
        const saved = localStorage.getItem('tasks');
        let finalTask = updatedTask;
        if (saved) {
          const tasks: Task[] = JSON.parse(saved);
          const index = tasks.findIndex(t => t.id === updatedTask.id);
          if (index !== -1) {
            tasks[index] = updatedTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
          }
        }
        return { data: finalTask };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Task', id: arg.id }],
    }),
    
    deleteTask: builder.mutation<string, string>({
      async queryFn(taskId) {
        await delay(MOCK_DELAY);
        const saved = localStorage.getItem('tasks');
        if (saved) {
          const tasks: Task[] = JSON.parse(saved);
          const filtered = tasks.filter(t => t.id !== taskId);
          localStorage.setItem('tasks', JSON.stringify(filtered));
        }
        return { data: taskId };
      },
      invalidatesTags: (result, error, id) => [{ type: 'Task', id }],
    }),
  }),
});

export const { 
  useGetTasksQuery, 
  useAddTaskMutation, 
  useUpdateTaskMutation, 
  useDeleteTaskMutation 
} = apiSlice;
