import { useState, useRef, useEffect } from 'react';
import type { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function startEdit() {
    if (todo.completed) return;
    setEditValue(todo.text);
    setEditing(true);
  }

  function commitEdit() {
    setEditing(false);
    onEdit(todo.id, editValue);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') {
      setEditValue(todo.text);
      setEditing(false);
    }
  }

  return (
    <li className="group flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-pink-100 transition-all duration-150">
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer ${
          todo.completed
            ? 'bg-pink-500 border-pink-500'
            : 'border-slate-300 hover:border-pink-400 hover:bg-pink-50'
        }`}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Text / Edit input */}
      {editing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm text-slate-700 bg-pink-50 border border-pink-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      ) : (
        <span
          onDoubleClick={startEdit}
          title={todo.completed ? '' : 'Double-click to edit'}
          className={`flex-1 text-sm leading-relaxed transition-all duration-150 select-none ${
            todo.completed
              ? 'line-through text-slate-400 cursor-default'
              : 'text-slate-700 cursor-text'
          }`}
        >
          {todo.text}
        </span>
      )}

      {/* Edit hint — shown on hover for non-completed tasks */}
      {!editing && !todo.completed && (
        <button
          onClick={startEdit}
          aria-label="Edit task"
          className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-pink-400 transition-all duration-150 cursor-pointer p-1 rounded"
          title="Edit"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
          </svg>
        </button>
      )}

      {/* Delete button — always visible, prominent */}
      <button
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
        className="text-slate-200 hover:text-red-400 hover:bg-red-50 transition-all duration-150 cursor-pointer p-1.5 rounded-lg flex-shrink-0"
        title="Delete"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3" />
        </svg>
      </button>
    </li>
  );
}
