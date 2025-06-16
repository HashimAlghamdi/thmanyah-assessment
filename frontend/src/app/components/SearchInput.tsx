"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearch } from "../contexts/SearchContext";
import { useResponsive } from "../contexts/ResponsiveContext";

interface SearchInputProps {
  className?: string;
}

export default function SearchInput({ className }: SearchInputProps) {
  const { isMobile } = useResponsive();
  const { isLoading, performSearch } = useSearch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setInputValue(query);
    
    if (query.trim()) {
      performSearch(query, false);
    }
    
    if (query && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchParams, performSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentQuery = searchParams.get("q") || "";
      if (inputValue.trim() !== currentQuery) {
        if (inputValue.trim()) {
          router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
        } else {
          router.push("/");
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, searchParams, router]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleClear = useCallback(() => {
    setInputValue("");
    router.push("/");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [router]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (inputValue.trim()) {
          router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
        }
      }
      if (e.key === "Escape") {
        handleClear();
      }
    },
    [inputValue, router, handleClear]
  );

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={
            isMobile ? "بحث..." : "ابحث عن أكثر من 70 مليون بودكاست ..."
          }
          className="w-full px-3 md:px-4 py-2 text-sm md:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
          autoFocus={!!searchParams.get("q")}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <svg
              className="animate-spin h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : inputValue ? (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-300"
              aria-label="Clear search"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
