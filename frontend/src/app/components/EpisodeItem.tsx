interface EpisodeItemProps {
  id: number;
  title: string;
  subtitle: string;
}

export default function EpisodeItem({ title, subtitle }: EpisodeItemProps) {
  return (
    <div className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded-lg group cursor-pointer">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex-shrink-0"></div>
      <div className="flex-1">
        <h3 className="font-semibold group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
      <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-700 rounded transition-all">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
    </div>
  );
} 