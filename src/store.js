import { configureStore } from '@reduxjs/toolkit';
import todosReducer, { STORAGE_KEY } from './slices/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

// Persist every state change back to localStorage, mirroring the app's
// previous behaviour where the task list survived a page reload.
store.subscribe(() => {
  try {
    const { todos } = store.getState().todos;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.warn(`Could not persist todos to localStorage:`, error);
  }
});