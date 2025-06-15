import { Episode } from "../interfaces/Episode";

interface EpisodeCompactLayoutProps {
  episodes: Episode[];
}

export default function EpisodeCompactLayout({ episodes }: EpisodeCompactLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {episodes.map((episode) => (
        <div
          key={episode.id}
          className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg group cursor-pointer"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex-shrink-0 flex items-center justify-center">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold group-hover:text-blue-400 transition-colors text-sm md:text-base truncate">
              {episode.title}
            </h3>
            <p className="text-gray-400 text-xs md:text-sm truncate">{episode.subtitle}</p>
            <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 mt-1">
              <span>{episode.date || "Feb 6"}</span>
              <span>{episode.duration || "31min"}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 