import { useState, useRef, useEffect } from "react";
import EpisodeCard from "./EpisodeCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Episode } from "../interfaces/Episode";

interface EpisodeScrollLayoutProps {
  episodes: Episode[];
  scrollTrigger?: number;
}

export default function EpisodeScrollLayout({
  episodes,
  scrollTrigger,
}: EpisodeScrollLayoutProps) {
  const [isHovered, setIsHovered] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    const scrollArea = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
    if (scrollArea) {
      // Calculate scroll distance based on visible episodes - responsive widths
      const containerWidth = scrollArea.clientWidth;
      const episodeWidth = window.innerWidth < 768 ? 160 + 12 : 192 + 16; // Smaller on mobile
      const visibleEpisodes = Math.floor(containerWidth / episodeWidth);
      const scrollDistance = Math.max(visibleEpisodes * episodeWidth, episodeWidth);
      
      scrollArea.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const scrollArea = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
    if (scrollArea) {
      // Calculate scroll distance based on visible episodes - responsive widths
      const containerWidth = scrollArea.clientWidth;
      const episodeWidth = window.innerWidth < 768 ? 160 + 12 : 192 + 16; // Smaller on mobile
      const visibleEpisodes = Math.floor(containerWidth / episodeWidth);
      const scrollDistance = Math.max(visibleEpisodes * episodeWidth, episodeWidth);
      
      scrollArea.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scrollArea = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
    if (scrollArea) {
      // Set initial scroll position to rightmost (start position for RTL)
      const setInitialPosition = () => {
        if (scrollArea.scrollWidth > scrollArea.clientWidth) {
          scrollArea.scrollLeft = scrollArea.scrollWidth - scrollArea.clientWidth;
        }
      };
      
      // Try multiple times to ensure content is loaded
      setTimeout(setInitialPosition, 50);
      setTimeout(setInitialPosition, 200);
      setTimeout(setInitialPosition, 500);
    }
  }, [episodes]);

  useEffect(() => {
    if (scrollTrigger !== undefined) {
      if (scrollTrigger > 0) {
        scrollRight();
      } else if (scrollTrigger < 0) {
        scrollLeft();
      }
    }
  }, [scrollTrigger]);

  return (
    <ScrollArea
      ref={scrollAreaRef}
      className="max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] whitespace-nowrap"
      dir="rtl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-3 md:gap-4 pb-4">
        {episodes.map((episode) => (
          <div key={episode.id} className="flex-shrink-0 w-40 md:w-48">
            <EpisodeCard
              id={episode.id}
              title={episode.title}
              subtitle={episode.subtitle}
              duration={episode.duration}
              date={episode.date}
            />
          </div>
        ))}
      </div>
      <ScrollBar
        orientation="horizontal"
        className={`${
          isHovered ? "h-2" : "h-1"
        } data-[state=dragging]:h-2 transition-all duration-200`}
        forceMount
      />
    </ScrollArea>
  );
} 