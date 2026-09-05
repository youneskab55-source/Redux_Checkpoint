import { createSlice } from '@reduxjs/toolkit';

export const STORAGE_KEY = 'todo-app:todos';

function loadInitialTodos() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn(`Could not read localStorage key "${STORAGE_KEY}":`, error);
    return [];
  }
}

const initialState = {
  todos: loadInitialTodos(),
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.todos.push(action.payload);
      },
      prepare(description) {
        return {
          payload: {
            id: crypto.randomUUID(),
            description,
            isDone: false,
          },
        };
      },
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo(state, action) {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.isDone = !todo.isDone;
    },
    editTodo(state, action) {
      const { id, description } = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) todo.description = description;
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, editTodo } = todosSlice.actions;

export const selectAllTodos = (state) => state.todos.todos;

export default todosSlice.reducer;