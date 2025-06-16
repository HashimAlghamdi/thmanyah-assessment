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
            emptyMessage="ابحث عن شيء لرؤية النتائج"
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
            emptyMessage="لا توجد بودكاست تطابق بحثك"
          />
        </>
      )}
    </div>
  );
}

// Empty state for homepage
function HomepageEmptyState() {
  return (
    <section className="mb-8 md:mb-12">
      <div className="flex items-center justify-between mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-800">
        <h2 className="text-xl md:text-2xl font-bold">أفضل البودكاست</h2>
      </div>
      
      <div className="text-center py-16 md:py-20">
        <svg className="w-16 h-16 md:w-20 md:h-20 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-2">
          ابحث عن شيء لرؤية النتائج
        </h3>
        <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto">
          استخدم شريط البحث أعلاه للعثور على البودكاست والحلقات المفضلة لديك
        </p>
      </div>
    </section>
  );
} 