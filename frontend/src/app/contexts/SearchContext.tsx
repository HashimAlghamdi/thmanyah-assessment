"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { apiClient } from '../lib/api';
import { Podcast } from '../interfaces/Podcast';

interface SearchContextType {
  searchResults: Podcast[];
  isLoading: boolean;
  error: string | null;
  performSearch: (term: string) => Promise<void>;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchResults, setSearchResults] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      clearSearch();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.search(term);
      
      // No conversion needed - interfaces match directly
      setSearchResults(response.podcasts);
      
      if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setError(null);
    setIsLoading(false);
  }, []);

  return (
    <SearchContext.Provider value={{
      searchResults,
      isLoading,
      error,
      performSearch,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 