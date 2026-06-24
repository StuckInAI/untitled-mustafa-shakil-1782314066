import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoFilter from '@/components/TodoFilter';
import TodoList from '@/components/TodoList';

export default function TodoPage() {
  const {
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-slate-50 to-indigo-50 flex items-start justify-center pt-16 px-4 pb-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">My To-Do List</h1>
          <p className="text-slate-400 text-sm mt-2">Stay organised, get things done.</p>
        </div>

        {/* Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-6">
          <TodoInput onAdd={addTodo} />

          <TodoFilter
            filter={filter}
            onFilterChange={setFilter}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />

          <TodoList
            todos={filteredTodos}
            filter={filter}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />

          {/* Summary */}
          {activeCount > 0 && (
            <p className="text-xs text-slate-400 text-center mt-5">
              {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
            </p>
          )}
          {activeCount === 0 && completedCount > 0 && (
            <p className="text-xs text-violet-400 text-center mt-5 font-medium">
              All tasks complete! 🎉
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
