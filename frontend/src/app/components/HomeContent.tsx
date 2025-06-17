"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import TopPodcasts from "./TopPodcasts";
import LoadingSpinner from "./LoadingSpinner";
import { useSearch } from "../contexts/SearchContext";

export default function HomeContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const { searchResults, isLoading, error, performSearch, clearSearch } = useSearch();
  const lastSearchRef = useRef<string>("");

  const isSearching = searchQuery.length > 0;

  // Trigger search when URL params change
  useEffect(() => {
    if (searchQuery.trim()) {
      // Always pass true - SearchContext will handle navigation vs new search internally
      performSearch(searchQuery, true);
      lastSearchRef.current = searchQuery;
    } else {
      clearSearch();
      lastSearchRef.current = "";
    }
  }, [searchQuery, performSearch, clearSearch]);

  // Show unified loading state when searching
  if (isSearching && isLoading) {
    return <LoadingSpinner size="lg" text="جاري البحث..." />;
  }

  return (
    <div className="space-y-8 md:space-y-12">
      {!isSearching ? (
        <>
          {/* Homepage - Show empty state */}
          <TopPodcasts 
            podcasts={[]} 
            isSearchPrompt={true}
          />
        </>
      ) : (
        <>
          {/* Search Results */}
          <TopPodcasts
            podcasts={searchResults}
            title={`نتائج البحث عن "${searchQuery}"`}
            error={error}
          />
        </>
      )}
    </div>
  );
} 