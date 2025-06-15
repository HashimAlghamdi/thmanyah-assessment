import PodcastCard from './PodcastCard';

interface Podcast {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

interface PodcastGridLayoutProps {
  podcasts: Podcast[];
}

export default function PodcastGridLayout({ podcasts }: PodcastGridLayoutProps) {
  return (
    <div className="grid grid-cols-7 gap-4">
      {podcasts.map((podcast) => (
        <PodcastCard
          key={podcast.id}
          id={podcast.id}
          title={podcast.title}
          subtitle={podcast.subtitle}
          description={podcast.description}
        />
      ))}
    </div>
  );
} 