import type { FilterType } from '@/types/todo';

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  completedCount: number;
  onClearCompleted: () => void;
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function TodoFilter({
  filter,
  onFilterChange,
  completedCount,
  onClearCompleted,
}: TodoFilterProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
              filter === f.value
                ? 'bg-white text-violet-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs text-slate-400 hover:text-red-400 transition-colors duration-150 cursor-pointer"
        >
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
