"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useMemo } from 'react';
import { apiClient } from '../lib/api';
import { Podcast } from '../interfaces/Podcast';

interface SearchContextType {
  searchResults: Podcast[];
  isLoading: boolean;
  error: string | null;
  searchHistory: string[];
  currentHistoryIndex: number;
  canGoBack: boolean;
  canGoForward: boolean;
  performSearch: (term: string, addToHistoryFlag?: boolean) => Promise<void>;
  clearSearch: () => void;
  goBackInHistory: () => string | null;
  goForwardInHistory: () => string | null;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchResults, setSearchResults] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const isNavigatingRef = useRef(false);
  const lastSearchTermRef = useRef<string>("");

  const canGoBack = currentHistoryIndex > 0;
  const canGoForward = currentHistoryIndex < searchHistory.length - 1;

  const addToHistory = useCallback((term: string) => {
    if (!term.trim()) return;
    
    const trimmedTerm = term.trim();
    
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item !== trimmedTerm);
      const newHistory = [...filtered, trimmedTerm];
      setCurrentHistoryIndex(newHistory.length - 1);
      return newHistory;
    });
  }, []);

  const performSearch = useCallback(async (term: string, addToHistoryFlag = true) => {
    if (!term.trim()) {
      clearSearch();
      return;
    }

    const trimmedTerm = term.trim();
    
    // Prevent duplicate searches for the same term
    if (lastSearchTermRef.current === trimmedTerm && !isNavigatingRef.current) {
      return;
    }

    lastSearchTermRef.current = trimmedTerm;
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.search(trimmedTerm);
      setSearchResults(response.podcasts);
      
      if (addToHistoryFlag && !isNavigatingRef.current) {
        addToHistory(trimmedTerm);
      }
      
      isNavigatingRef.current = false;
      
      if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [addToHistory]);

  const goBackInHistory = useCallback((): string | null => {
    if (!canGoBack) return null;
    
    const newIndex = currentHistoryIndex - 1;
    setCurrentHistoryIndex(newIndex);
    isNavigatingRef.current = true;
    return searchHistory[newIndex];
  }, [canGoBack, currentHistoryIndex, searchHistory]);

  const goForwardInHistory = useCallback((): string | null => {
    if (!canGoForward) return null;
    
    const newIndex = currentHistoryIndex + 1;
    setCurrentHistoryIndex(newIndex);
    isNavigatingRef.current = true;
    return searchHistory[newIndex];
  }, [canGoForward, currentHistoryIndex, searchHistory]);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setError(null);
    setIsLoading(false);
    isNavigatingRef.current = false;
    lastSearchTermRef.current = "";
  }, []);

  const contextValue = useMemo(() => ({
    searchResults,
    isLoading,
    error,
    searchHistory,
    currentHistoryIndex,
    canGoBack,
    canGoForward,
    performSearch,
    clearSearch,
    goBackInHistory,
    goForwardInHistory
  }), [
    searchResults,
    isLoading,
    error,
    searchHistory,
    currentHistoryIndex,
    canGoBack,
    canGoForward,
    performSearch,
    clearSearch,
    goBackInHistory,
    goForwardInHistory
  ]);

  return (
    <SearchContext.Provider value={contextValue}>
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