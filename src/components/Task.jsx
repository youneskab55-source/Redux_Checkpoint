import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo, toggleTodo } from '../slices/todosSlice';

/**
 * Task
 * A single row in the list. All changes to the task data are dispatched
 * to the Redux store; the only local state is tiny UI state: whether the
 * row is in "editing" mode and whether the delete-confirm popover is open.
 */
export default function Task({ todo, index }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.description);
  const [error, setError] = useState('');
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  function startEditing() {
    setDraft(todo.description);
    setError('');
    setEditing(true);
  }

  function saveEdit(event) {
    event.preventDefault();
    if (!draft.trim()) {
      setError('Task description is required.');
      return;
    }
    dispatch(editTodo({ id: todo.id, description: draft.trim() }));
    setEditing(false);
  }

  function handleConfirmDelete() {
    dispatch(deleteTodo(todo.id));
    setConfirmingDelete(false);
  }

  if (editing) {
    return (
      <li className={`task-item ${todo.isDone ? 'completed' : ''}`}>
        <span className="index">{String(index).padStart(2, '0')}</span>
        <form className="task-edit-form" onSubmit={saveEdit}>
          <div className={`task-edit-field ${error ? 'has-error' : ''}`}>
            <input
              type="text"
              className="task-edit-input"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                if (error) setError('');
              }}
              autoFocus
              aria-label="Edit task description"
            />
            {error && <p className="field-error">{error}</p>}
          </div>
          <div className="form-actions">
            <button type="submit" className="btn">
              Save
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className={`task-item ${todo.isDone ? 'completed' : ''}`}>
      <span className="index">{String(index).padStart(2, '0')}</span>

      <input
        type="checkbox"
        className="task-checkbox"
        checked={todo.isDone}
        onChange={() => dispatch(toggleTodo(todo.id))}
        aria-label={`Mark "${todo.description}" as ${todo.isDone ? 'not done' : 'done'}`}
      />

      {/* Clicking the task body is the "click on the task to edit it"
          affordance requested in the brief. */}
      <div
        className="task-body"
        onClick={startEditing}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') startEditing();
        }}
      >
        <p className="task-name">{todo.description}</p>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="icon-btn"
          title="Edit task"
          aria-label="Edit task"
          onClick={startEditing}
        >
          ✎
        </button>
        <button
          type="button"
          className="icon-btn delete"
          title="Delete task"
          aria-label="Delete task"
          onClick={() => setConfirmingDelete(true)}
        >
          ✕
        </button>
      </div>

      {confirmingDelete && (
        <div className="confirm-box" role="dialog" aria-label="Confirm delete">
          <p>Delete "{todo.description}"? This can't be undone.</p>
          <div className="confirm-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setConfirmingDelete(false)}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}