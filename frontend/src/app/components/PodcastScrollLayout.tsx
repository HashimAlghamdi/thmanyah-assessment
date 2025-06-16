import { useState, useRef, useEffect } from "react";
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    const scrollArea = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement;
    if (scrollArea) {
      // Calculate scroll distance based on visible podcasts - responsive widths
      const containerWidth = scrollArea.clientWidth;
      const podcastWidth = window.innerWidth < 768 ? 160 + 12 : 192 + 16; // Smaller on mobile
      const visiblePodcasts = Math.floor(containerWidth / podcastWidth);
      const scrollDistance = Math.max(
        visiblePodcasts * podcastWidth,
        podcastWidth
      );

      scrollArea.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const scrollArea = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement;
    if (scrollArea) {
      // Calculate scroll distance based on visible podcasts - responsive widths
      const containerWidth = scrollArea.clientWidth;
      const podcastWidth = window.innerWidth < 768 ? 160 + 12 : 192 + 16; // Smaller on mobile
      const visiblePodcasts = Math.floor(containerWidth / podcastWidth);
      const scrollDistance = Math.max(
        visiblePodcasts * podcastWidth,
        podcastWidth
      );

      scrollArea.scrollBy({ left: -scrollDistance, behavior: "smooth" });
    }
  };

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
  );
}
