"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
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
  const currentSearchTermRef = useRef<string>("");
  const searchAbortControllerRef = useRef<AbortController | null>(null);

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
    
    // Prevent duplicate API calls for the same search term
    if (isLoading || currentSearchTermRef.current === trimmedTerm) {
      return;
    }

    // Cancel any ongoing search
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort();
    }

    // Create new abort controller for this search
    const abortController = new AbortController();
    searchAbortControllerRef.current = abortController;
    currentSearchTermRef.current = trimmedTerm;

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.search(trimmedTerm);
      
      // Check if this search was aborted
      if (abortController.signal.aborted) {
        return;
      }
      
      setSearchResults(response.podcasts);
      
      if (addToHistoryFlag && !isNavigatingRef.current) {
        addToHistory(trimmedTerm);
      }
      
      isNavigatingRef.current = false;
      
      if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      if (abortController.signal.aborted) {
        return; // Don't set error state for aborted requests
      }
      setError(err instanceof Error ? err.message : 'Search failed');
      setSearchResults([]);
    } finally {
      if (!abortController.signal.aborted) {
        setIsLoading(false);
        searchAbortControllerRef.current = null;
      }
    }
  }, [addToHistory, isLoading]);

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
    // Cancel any ongoing search
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort();
      searchAbortControllerRef.current = null;
    }
    
    setSearchResults([]);
    setError(null);
    setIsLoading(false);
    isNavigatingRef.current = false;
    currentSearchTermRef.current = "";
  }, []);

  return (
    <SearchContext.Provider value={{
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