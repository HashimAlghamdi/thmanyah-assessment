import { Podcast } from "../interfaces/Podcast";
import PodcastCard from "./PodcastCard";

interface PodcastGridLayoutProps {
  podcasts: Podcast[];
}

export default function PodcastGridLayout({
  podcasts,
}: PodcastGridLayoutProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4">
      {podcasts.map((podcast) => (
        <PodcastCard
          key={podcast.id}
          id={podcast.id}
          title={podcast.title}
          artistName={podcast.artistName}
          image={podcast.image}
        />
      ))}
    </div>
  );
}
