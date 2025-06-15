import { useState } from "react";
import PodcastCard from "./PodcastCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Podcast {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

interface PodcastScrollLayoutProps {
  podcasts: Podcast[];
}

export default function PodcastScrollLayout({
  podcasts,
}: PodcastScrollLayoutProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <ScrollArea
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
