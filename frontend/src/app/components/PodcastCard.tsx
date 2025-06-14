interface PodcastCardProps {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

export default function PodcastCard({ title, subtitle, description }: PodcastCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-square bg-gradient-to-br from-orange-400 to-pink-600 rounded-lg mb-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-200"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg font-bold text-center p-4">
            {title}
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-sm mb-1 group-hover:text-blue-400 transition-colors">
        {description}
      </h3>
      <p className="text-gray-400 text-xs">{subtitle}</p>
    </div>
  );
} 