import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task, TaskPriority, TaskStatus } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface TaskState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: null,
};

const MOCK_DELAY = 800;

// Mock API calls
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return new Promise<Task[]>((resolve) => {
    setTimeout(() => {
      const saved = localStorage.getItem('tasks');
      if (saved) {
        resolve(JSON.parse(saved));
      } else {
        // Initial mock data
        const initialData: Task[] = [
          { id: uuidv4(), title: 'Set up project repository', status: 'Completed', priority: 'High', createdAt: new Date().toISOString() },
          { id: uuidv4(), title: 'Design dashboard UI layout', status: 'Pending', priority: 'Medium', createdAt: new Date().toISOString() },
          { id: uuidv4(), title: 'Implement Redux state management', status: 'Pending', priority: 'High', createdAt: new Date().toISOString() },
        ];
        localStorage.setItem('tasks', JSON.stringify(initialData));
        resolve(initialData);
      }
    }, MOCK_DELAY);
  });
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData: { title: string; priority: TaskPriority }) => {
  return new Promise<Task>((resolve) => {
    setTimeout(() => {
      const newTask: Task = {
        id: uuidv4(),
        title: taskData.title,
        status: 'Pending',
        priority: taskData.priority,
        createdAt: new Date().toISOString(),
      };
      resolve(newTask);
    }, MOCK_DELAY);
  });
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (updatedTask: Task) => {
  return new Promise<Task>((resolve) => {
    setTimeout(() => resolve(updatedTask), MOCK_DELAY);
  });
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(taskId), MOCK_DELAY);
  });
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      // Add Task
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.unshift(action.payload);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      })
      // Update Task
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
          localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
      })
      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      });
  },
});

export default taskSlice.reducer;
