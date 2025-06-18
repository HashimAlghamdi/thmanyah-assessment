"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useResponsive } from "../contexts/ResponsiveContext";

interface SearchInputProps {
  className?: string;
}

export default function SearchInput({ className }: SearchInputProps) {
  const { isMobile } = useResponsive();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const isTypingRef = useRef(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const query = searchParams.get("q") || "";

    // Only update input value if user is not actively typing
    if (!isTypingRef.current) {
      setInputValue(query);
    }

    // Focus input if there's a query and user is not typing
    if (query && inputRef.current && !isTypingRef.current) {
      inputRef.current.focus();
    }
  }, [searchParams]); // Removed performSearch from dependencies and the call

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
      const newValue = e.target.value;
      setInputValue(newValue);

      // Mark as typing and reset the typing timeout
      isTypingRef.current = true;
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Clear typing flag after user stops typing for 1 second
      typingTimeoutRef.current = setTimeout(() => {
        isTypingRef.current = false;
      }, 1000);
    },
    []
  );

  const handleClear = useCallback(() => {
    isTypingRef.current = false;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

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
          {inputValue ? (
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
