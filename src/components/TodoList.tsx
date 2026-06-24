import type { Todo, FilterType } from '@/types/todo';
import TodoItem from '@/components/TodoItem';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

function EmptyState({ filter }: { filter: FilterType }) {
  if (filter === 'completed') {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-slate-400 text-sm gap-2">
        <span className="text-3xl">🗂️</span>
        <p className="font-medium text-slate-500">No completed tasks yet</p>
        <p className="text-xs text-slate-400">Check off a task to see it here</p>
      </div>
    );
  }
  if (filter === 'active') {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-slate-400 text-sm gap-2">
        <span className="text-3xl">🎉</span>
        <p className="font-medium text-slate-500">All done!</p>
        <p className="text-xs text-slate-400">You've completed everything</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center py-10 text-slate-400 text-sm gap-2">
      <span className="text-3xl">📝</span>
      <p className="font-medium text-slate-500">No tasks yet</p>
      <p className="text-xs text-slate-400">Add your first task above to get started</p>
    </div>
  );
}

export default function TodoList({ todos, filter, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
