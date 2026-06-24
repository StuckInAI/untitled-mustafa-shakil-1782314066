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
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
    totalCount,
  } = useTodos();

  const progressPct = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const allDone = totalCount > 0 && activeCount === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-slate-50 to-indigo-100 flex items-start justify-center pt-14 px-4 pb-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">My Tasks</h1>
          <p className="text-slate-400 text-sm mt-1">
            {totalCount === 0
              ? 'Add something to get started'
              : allDone
              ? 'All done — great work! 🎉'
              : `${activeCount} remaining · ${completedCount} done`}
          </p>
        </div>

        {/* Progress bar */}
        {totalCount > 0 && (
          <div className="mb-5">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>{progressPct}% complete</span>
              <span>{completedCount}/{totalCount}</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-400 to-violet-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 p-6">
          <TodoInput onAdd={addTodo} />

          <TodoFilter
            filter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />

          <TodoList
            todos={filteredTodos}
            filter={filter}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>

        {/* Hint */}
        {totalCount > 0 && (
          <p className="text-center text-xs text-slate-400 mt-4">
            Double-click any task to edit it
          </p>
        )}
      </div>
    </div>
  );
}
