"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import TopPodcasts from "./TopPodcasts";
import { useSearch } from "../contexts/SearchContext";

export default function HomeContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const { searchResults, isLoading, error, performSearch, clearSearch } = useSearch();

  const isSearching = searchQuery.length > 0;

  // Trigger search when URL params change
  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    } else {
      clearSearch();
    }
  }, [searchQuery, performSearch, clearSearch]);

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
            isLoading={isLoading}
            error={error}
          />
        </>
      )}
    </div>
  );
} 