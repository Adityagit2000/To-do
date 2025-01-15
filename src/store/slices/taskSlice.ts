import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TaskState, Task } from '../../types';

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  activeFilter: 'all',
};

export const fetchWeather = async () => {
  try {
    return {
      temp: 22,
      condition: 'Sunny',
      icon: '☀️',
    };
  } catch (error) {
    console.error('Weather data error:', error);
    return null;
  }
};

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: Omit<Task, 'id' | 'createdAt' | 'weather' | 'isImportant'>) => {
    try {
      const weather = await fetchWeather();
      return {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        weather,
        isImportant: false,
      };
    } catch (error) {
      console.error('Error adding task:', error);
      return {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        isImportant: false,
      };
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTaskPriority: (state, action) => {
      const { id, priority } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        task.priority = priority;
      }
    },
    toggleImportant: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.isImportant = !task.isImportant;
      }
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loading = false;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add task';
      });
  },
});

export const {
  toggleTask,
  deleteTask,
  updateTaskPriority,
  toggleImportant,
  setActiveFilter,
  updateTask
} = taskSlice.actions;

export default taskSlice.reducer;