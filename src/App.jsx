import { useSelector } from 'react-redux';
import AddTask from './components/AddTask.jsx';
import ListTask from './components/ListTask.jsx';
import { selectAllTodos } from './slices/todosSlice';

/**
 * App
 * The top-level component of the Redux version. It no longer owns the
 * task state — that lives in the Redux store — so it only reads what it
 * needs for the header tally and composes the two feature components.
 */
export default function App() {
  const todos = useSelector(selectAllTodos);
  const remaining = todos.filter((todo) => !todo.isDone).length;

  return (
    <div>
      <header className="app-header">
        <h1>Ledger</h1>
        <span className="tally">
          {remaining} of {todos.length} open
        </span>
      </header>

      <AddTask />

      <ListTask />

      <footer className="app-footer">Tasks are saved in this browser only.</footer>
    </div>
  );
}
