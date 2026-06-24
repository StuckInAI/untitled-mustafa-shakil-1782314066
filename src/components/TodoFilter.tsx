import type { FilterType } from '@/types/todo';

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Done', value: 'completed' },
];

export default function TodoFilter({
  filter,
  onFilterChange,
  activeCount,
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
                ? 'bg-white text-pink-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {f.label}
            {f.value === 'active' && activeCount > 0 && (
              <span className="ml-1.5 bg-pink-100 text-pink-600 rounded-full px-1.5 py-0.5 text-xs font-bold">
                {activeCount}
              </span>
            )}
            {f.value === 'completed' && completedCount > 0 && (
              <span className="ml-1.5 bg-slate-200 text-slate-500 rounded-full px-1.5 py-0.5 text-xs font-bold">
                {completedCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs text-slate-400 hover:text-red-400 transition-colors duration-150 cursor-pointer flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22" />
          </svg>
          Clear done ({completedCount})
        </button>
      )}
    </div>
  );
}
