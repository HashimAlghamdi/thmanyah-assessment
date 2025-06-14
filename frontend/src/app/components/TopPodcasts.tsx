"use client";

import { useState } from "react";
import PodcastCard from "./PodcastCard";
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

interface TopPodcastsProps {
  podcasts: Podcast[];
}

export default function TopPodcasts({ podcasts }: TopPodcastsProps) {
  const { layout, setLayout } = useLayout();
  const { isMobile } = useResponsive();
  const [scrollTrigger, setScrollTrigger] = useState<number | undefined>(undefined);

  const handleScrollLeft = () => {
    setScrollTrigger(Date.now() * -1);
  };

  const handleScrollRight = () => {
    setScrollTrigger(Date.now());
  };

  return (
    <section className="mb-8 md:mb-12">
      <div className="flex items-center justify-between mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-800">
        <h2 className="text-xl md:text-2xl font-bold">أفضل البودكاست لـ شد</h2>
        <div className="flex space-x-1 md:space-x-2">
          {layout === "scroll" && !isMobile && (
            <>
              <button
                className="p-2 rounded transition-colors hover:bg-gray-800 text-white"
                onClick={handleScrollLeft}
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
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
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
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
      </div>

      {layout === "scroll" ? (
        <PodcastScrollLayout
          podcasts={podcasts}
          scrollTrigger={scrollTrigger}
        />
      ) : (
        <PodcastGridLayout podcasts={podcasts} />
      )}
    </section>
  );
}
