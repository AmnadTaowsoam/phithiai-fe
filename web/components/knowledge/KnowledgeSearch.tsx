'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface KnowledgeSearchProps {
  onSearch: (query: string) => void;
  results: { id: string; title: string; category: string; tags: string[] }[];
  initialQuery?: string;
}

export function KnowledgeSearch({ onSearch, results, initialQuery = '' }: KnowledgeSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-colors ${
            isFocused
              ? 'border-brand-500 ring-2 ring-brand-500'
              : 'border-ivory/20 focus:border-brand-500 focus:ring-2 focus:ring-brand-500'
          }`}
          type="text"
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 p-3 text-ivory/60 hover:text-ivory/90"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/* Search Results Dropdown */}
      {query && results.length > 0 && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 w-full bg-white rounded-lg border border-ivory/10 shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4">
            <p className="text-xs font-semibold text-ivory/60 uppercase tracking-wider mb-2">
              {results.length} Result{results.length !== 1 ? 's' : ''}
            </p>
            <div className="space-y-2">
              {results.slice(0, 10).map((result) => (
                <button
                  key={result.id}
                  onClick={() => {
                    onSearch(result.title);
                    setIsFocused(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-md hover:bg-ivory/5 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {result.category.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ivory/90">
                        {result.title}
                      </p>
                      <p className="text-xs text-ivory/60 mt-1">
                        {result.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-1 bg-ivory/10 rounded text-xs text-ivory/60 mr-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
              </div>
            </div>
        </div>
      )}
    </div>
  );
}
