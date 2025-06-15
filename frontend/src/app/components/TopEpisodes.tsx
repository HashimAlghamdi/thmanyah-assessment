import EpisodeItem from './EpisodeItem';

interface Episode {
  id: number;
  title: string;
  subtitle: string;
}

interface TopEpisodesProps {
  episodes: Episode[];
}

export default function TopEpisodes({ episodes }: TopEpisodesProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
        <h2 className="text-2xl font-bold">أفضل الحلقات لـ شد</h2>
        <button className="p-2 hover:bg-gray-800 rounded">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {episodes.map((episode) => (
          <EpisodeItem
            key={episode.id}
            id={episode.id}
            title={episode.title}
            subtitle={episode.subtitle}
          />
        ))}
      </div>
    </section>
  );
} 