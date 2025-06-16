import { useState, useRef, useEffect, useCallback } from "react";
import PodcastCard from "./PodcastCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Podcast } from "../interfaces/Podcast";

interface PodcastScrollLayoutProps {
  podcasts: Podcast[];
  scrollTrigger?: number;
}

export default function PodcastScrollLayout({
  podcasts,
  scrollTrigger,
}: PodcastScrollLayoutProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use ResizeObserver for more accurate mobile detection
  useEffect(() => {
    const checkIfMobile = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setIsMobile(containerWidth < 768);
      }
    };

    checkIfMobile();
    
    // Use ResizeObserver for better mobile detection
    const resizeObserver = new ResizeObserver(checkIfMobile);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const getScrollDistance = useCallback(() => {
    const scrollArea = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement;
    
    if (!scrollArea || !containerRef.current) return 0;
    
    const containerWidth = scrollArea.clientWidth;
    // Use actual container width instead of window.innerWidth for better mobile accuracy
    const podcastWidth = isMobile ? 172 : 208; // 160 + 12 gap vs 192 + 16 gap
    const visiblePodcasts = Math.floor(containerWidth / podcastWidth);
    
    return Math.max(visiblePodcasts * podcastWidth, podcastWidth);
  }, [isMobile]);

  const scrollLeft = useCallback(() => {
    const scrollArea = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement;
    if (scrollArea) {
      const scrollDistance = getScrollDistance();
      scrollArea.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  }, [getScrollDistance]);

  const scrollRight = useCallback(() => {
    const scrollArea = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement;
    if (scrollArea) {
      const scrollDistance = getScrollDistance();
      scrollArea.scrollBy({ left: -scrollDistance, behavior: "smooth" });
    }
  }, [getScrollDistance]);

  useEffect(() => {
    if (scrollTrigger !== undefined) {
      if (scrollTrigger > 0) {
        scrollRight();
      } else if (scrollTrigger < 0) {
        scrollLeft();
      }
    }
  }, [scrollTrigger, scrollRight, scrollLeft]);

  return (
    <div ref={containerRef} className="w-full">
      <ScrollArea
        ref={scrollAreaRef}
        className="max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] whitespace-nowrap"
        dir="rtl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-3 md:gap-4 pb-4">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="flex-shrink-0 w-40 md:w-48">
              <PodcastCard
                id={podcast.id}
                title={podcast.title}
                artistName={podcast.artistName}
                image={podcast.image}
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
    </div>
  );
}
