import type { Todo } from '@/types/todo';
import type { FilterType } from '@/types/todo';
import TodoItem from '@/components/TodoItem';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function emptyMessage(filter: FilterType): string {
  if (filter === 'completed') return 'No completed tasks yet.';
  if (filter === 'active') return 'All done! 🎉';
  return 'Nothing here yet — add a task above!';
}

export default function TodoList({ todos, filter, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-sm">
        <span className="text-3xl mb-3">✅</span>
        <p>{emptyMessage(filter)}</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
