import EpisodeCard from "./EpisodeCard";
import { Episode } from "../interfaces/Episode";

interface EpisodeGridLayoutProps {
  episodes: Episode[];
}

export default function EpisodeGridLayout({ episodes }: EpisodeGridLayoutProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4">
      {episodes.map((episode) => (
        <EpisodeCard
          key={episode.id}
          id={episode.id}
          title={episode.title}
          subtitle={episode.subtitle}
          duration={episode.duration}
          date={episode.date}
        />
      ))}
    </div>
  );
} 