"use client";

import { useState } from "react";
import PodcastScrollLayout from "./PodcastScrollLayout";
import PodcastGridLayout from "./PodcastGridLayout";
import { useLayout } from "../contexts/LayoutContext";
import { useResponsive } from "../contexts/ResponsiveContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Podcast } from "../interfaces/Podcast";
import LoadingSpinner from "./LoadingSpinner";

interface TopPodcastsProps {
  podcasts: Podcast[];
  title?: string;
  isLoading?: boolean;
  error?: string | null;
  isSearchPrompt?: boolean;
}

export default function TopPodcasts({
  podcasts,
  title,
  isLoading = false,
  error = null,
  isSearchPrompt = false,
}: TopPodcastsProps) {
  const { layout, setLayout } = useLayout();
  const { isMobile } = useResponsive();
  const [scrollTrigger, setScrollTrigger] = useState<number | undefined>(
    undefined
  );

  const handleScrollLeft = () => {
    setScrollTrigger(Date.now() * -1);
  };

  const handleScrollRight = () => {
    setScrollTrigger(Date.now());
  };

  return (
    <section className="mb-8 md:mb-12">
      <div className="flex items-center justify-between mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-800">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>

        {/* Only show controls when not loading and have podcasts */}
        {!isLoading && podcasts.length > 0 && (
          <div className="flex space-x-1 md:space-x-2">
            {layout === "scroll" && !isMobile && (
              <>
                <button
                  className="p-2 rounded transition-colors hover:bg-gray-800 text-white"
                  onClick={handleScrollLeft}
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  className="p-2 rounded transition-colors hover:bg-gray-800 text-white"
                  onClick={handleScrollRight}
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-gray-800 rounded">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-gray-800 border-gray-700"
              >
                <DropdownMenuItem
                  onClick={() => setLayout("scroll")}
                  className={`text-white hover:bg-gray-700 cursor-pointer text-sm md:text-base ${
                    layout === "scroll" ? "bg-gray-700" : ""
                  }`}
                >
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 ml-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21 12H3M3 12L7 8M3 12L7 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  العرض الافقي
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLayout("grid")}
                  className={`text-white hover:bg-gray-700 cursor-pointer text-sm md:text-base ${
                    layout === "grid" ? "bg-gray-700" : ""
                  }`}
                >
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 ml-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
                  </svg>
                  العرض الشبكي
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && <LoadingSpinner text="جاري البحث..." variant="inline" fullScreen={false} />}

      {/* Error State */}
      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-400 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-red-300 text-sm md:text-base">{error}</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && podcasts.length === 0 && (
        <div className="text-center py-12">
          {isSearchPrompt ? (
            <>
              <svg
                className="w-16 h-16 md:w-20 md:h-20 text-blue-500 mx-auto mb-4"
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
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                ابدأ البحث عن البودكاست المفضل لديك
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                ابحث عن شيء لرؤية النتائج
              </p>
            </>
          ) : (
            <>
              <svg
                className="w-16 h-16 md:w-20 md:h-20 text-gray-500 mx-auto mb-4"
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
              <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-2">
                لم يتم العثور على نتائج
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                لا توجد بودكاست تطابق بحثك
              </p>
            </>
          )}
        </div>
      )}

      {/* Podcast Results */}
      {!isLoading &&
        !error &&
        podcasts.length > 0 &&
        (layout === "scroll" ? (
          <PodcastScrollLayout
            podcasts={podcasts}
            scrollTrigger={scrollTrigger}
          />
        ) : (
          <PodcastGridLayout podcasts={podcasts} />
        ))}
    </section>
  );
}
