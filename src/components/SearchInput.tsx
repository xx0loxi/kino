'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchInput({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите название фильма..."
        className="w-full bg-slate-800 border border-slate-700 rounded-full py-3 px-6 pl-12 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder-slate-500"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-sky-600 hover:bg-sky-500 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
      >
        Найти
      </button>
    </form>
  );
}

