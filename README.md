# Ledger — a plain to-do list

A small React app for adding, editing, completing, and deleting tasks, with
everything persisted to `localStorage` so your list survives a page reload
or a closed tab.

## Running it locally

Requires [Node.js](https://nodejs.org/) 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Other useful scripts:

```bash
npm run build     # production build, output in dist/
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  App.jsx                  # Owns task state, wires everything together
  hooks/
    useLocalStorage.js     # Generic useState-that-persists-to-localStorage hook
  components/
    TaskForm.jsx            # Add/edit form with validation
    TaskList.jsx             # Filter controls + list rendering + empty state
    TaskItem.jsx              # One row: checkbox, edit, delete-with-confirm
  index.css                # All styling (no CSS framework)
```

## How it works

- **State lives in `App.jsx`.** The task array is the single source of
  truth; `TaskForm`, `TaskList`, and `TaskItem` are controlled components
  that receive data and callback props rather than managing their own
  copies of task data. This is what keeps add/edit/delete/toggle
  consistent with each other and with storage.
- **Persistence** is handled by the `useLocalStorage` hook, which is a
  drop-in replacement for `useState`: it reads `localStorage` on first
  load and writes back to it on every change, so no manual save/load
  wiring is needed elsewhere in the app.
- **Validation** happens in `TaskForm`: both the name and description
  fields must be non-empty (after trimming whitespace) before a task can
  be added or saved. Errors show inline under the relevant field and
  clear live as you fix them.
- **Editing** is the same form component in a different mode — clicking
  a task (or its pencil icon) scrolls to the top and pre-fills the form
  with that task's current values; submitting updates the existing task
  instead of creating a new one.
- **Deleting** requires confirmation: the trash icon opens a small
  popover with Cancel/Delete before anything is removed.
- **Filtering** (All / Active / Completed) is available above the list.

## Notes and considerations

- Tasks are stored per-browser (`localStorage` key `todo-app:tasks`) —
  clearing site data or switching browsers/devices will not carry your
  list over, and it isn't synced anywhere.
- Task IDs are generated with `crypto.randomUUID()`, available in all
  current evergreen browsers over `https://` or `localhost`.
- No external UI library or CSS framework is used — styling is plain CSS
  in `src/index.css` using a small set of CSS custom properties (colors,
  fonts) defined at the top of the file, so re-theming means editing
  values in one place.
- Not implemented (left as natural extensions): due dates, priority
  sorting, and drag-to-reorder. The data model (`task.id`, `name`,
  `description`, `completed`, `createdAt`) has room to add a `dueDate`
  or `priority` field without touching the persistence layer.
"# Redux_Checkpoint" 
