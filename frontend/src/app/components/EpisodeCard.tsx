import { Episode } from "../interfaces/Episode";

interface EpisodeCardProps extends Episode {}

export default function EpisodeCard({ 
  id, 
  title, 
  subtitle, 
  duration = "31min", 
  date = "Feb 6" 
}: EpisodeCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-3 hover:bg-gray-750 transition-colors cursor-pointer group">
      <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 rounded-md mb-3 flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2 text-sm">
          {title}
        </h3>
        <p className="text-gray-400 text-xs line-clamp-1">
          {subtitle}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>{date}</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
} 