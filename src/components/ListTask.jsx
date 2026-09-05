import { useState } from 'react';
import { useSelector } from 'react-redux';
import Task from './Task.jsx';
import { selectAllTodos } from '../slices/todosSlice';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'done', label: 'Done' },
  { key: 'notDone', label: 'Not done' },
];

/**
 * ListTask
 * Renders the filter toggle and the filtered list of tasks. The todos
 * themselves come from the Redux store; only the active filter is local
 * component state, since it's purely presentational.
 */
export default function ListTask() {
  const todos = useSelector(selectAllTodos);
  const [filter, setFilter] = useState('all');

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'done') return todo.isDone;
    if (filter === 'notDone') return !todo.isDone;
    return true;
  });

  const activeFilter = FILTERS.find((f) => f.key === filter);

  return (
    <section>
      <div className="filters">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={`filter-btn ${filter === key ? 'active' : ''}`}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {visibleTodos.length === 0 ? (
        <div className="empty-state">
          <span className="glyph">—</span>
          {todos.length === 0
            ? 'Nothing on the ledger yet. Add your first task above.'
            : `No ${activeFilter.label.toLowerCase()} tasks.`}
        </div>
      ) : (
        <ul className="task-list">
          {visibleTodos.map((todo, index) => (
            <Task key={todo.id} todo={todo} index={index + 1} />
          ))}
        </ul>
      )}
    </section>
  );
}