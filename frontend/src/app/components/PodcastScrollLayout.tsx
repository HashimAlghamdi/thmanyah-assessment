import { useState, useRef, useEffect } from "react";
import PodcastCard from "./PodcastCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Podcast } from "../interfaces/Podcast";

interface PodcastScrollLayoutProps {
  podcasts: Podcast[];
  onScrollStateChange?: (canScrollLeft: boolean, canScrollRight: boolean) => void;
  scrollTrigger?: number;
}

export default function PodcastScrollLayout({
  podcasts,
  onScrollStateChange,
  scrollTrigger,
}: PodcastScrollLayoutProps) {
  const [isHovered, setIsHovered] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const scrollArea = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
    if (scrollArea) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollArea;
      const newCanScrollLeft = scrollLeft > 0;
      const newCanScrollRight = scrollLeft < scrollWidth - clientWidth - 1;
      
      setCanScrollLeft(newCanScrollLeft);
      setCanScrollRight(newCanScrollRight);
      
      if (onScrollStateChange) {
        onScrollStateChange(newCanScrollLeft, newCanScrollRight);
      }
    }
  };

  const scrollLeft = () => {
    const scrollArea = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
    if (scrollArea) {
      // Calculate scroll distance based on visible podcasts
      const containerWidth = scrollArea.clientWidth;
      const podcastWidth = 192 + 16; // w-48 (192px) + gap-4 (16px)
      const visiblePodcasts = Math.floor(containerWidth / podcastWidth);
      const scrollDistance = visiblePodcasts * podcastWidth;
      
      scrollArea.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const scrollArea = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
    if (scrollArea) {
      // Calculate scroll distance based on visible podcasts
      const containerWidth = scrollArea.clientWidth;
      const podcastWidth = 192 + 16; // w-48 (192px) + gap-4 (16px)
      const visiblePodcasts = Math.floor(containerWidth / podcastWidth);
      const scrollDistance = visiblePodcasts * podcastWidth;
      
      scrollArea.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scrollArea = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
    if (scrollArea) {
      const handleScroll = () => checkScrollability();
      const handleResize = () => checkScrollability();
      
      scrollArea.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      
      // Initial check
      setTimeout(checkScrollability, 100);
      
      return () => {
        scrollArea.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [podcasts]);

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
      className="max-w-[85vw] whitespace-nowrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-4 pb-4">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="flex-shrink-0 w-48">
            <PodcastCard
              id={podcast.id}
              title={podcast.title}
              subtitle={podcast.subtitle}
              description={podcast.description}
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
