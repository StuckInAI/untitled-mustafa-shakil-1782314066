import { useRef, useEffect, useState } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add a new task…"
        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent shadow-sm transition"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="px-5 py-3 bg-pink-500 hover:bg-pink-600 active:bg-pink-700 disabled:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm shadow-sm transition-all duration-150 cursor-pointer flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add
      </button>
    </form>
  );
}
