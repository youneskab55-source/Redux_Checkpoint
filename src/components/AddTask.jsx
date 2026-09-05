import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../slices/todosSlice';

/**
 * AddTask
 * The form used to create a new task. It only collects a description
 * (the checkpoint's task model is `{ id, description, isDone }`) and
 * dispatches `addTodo` to the Redux store.
 */
export default function AddTask() {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    if (!description.trim()) {
      setError('Task description is required.');
      return;
    }
    dispatch(addTodo(description.trim()));
    setDescription('');
    setError('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <h2>Add a task</h2>

      <div className={`field ${error ? 'has-error' : ''}`}>
        <label htmlFor="add-task-description">Description</label>
        <input
          id="add-task-description"
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (error) setError('');
          }}
          placeholder="e.g. Renew passport"
        />
        {error && <p className="field-error">{error}</p>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn">
          Add task
        </button>
      </div>
    </form>
  );
}