import { Podcast } from "../interfaces/Podcast";
import Image from "next/image";

export default function PodcastCard({ title, artistName, image }: Podcast) {
  return (
    <div className="bg-gray-800 rounded-lg p-3 md:p-4 hover:bg-gray-750 transition-colors cursor-pointer group">
      <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mb-3 md:mb-4 flex items-center justify-center overflow-hidden relative">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 160px, 192px"
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            quality={85}
            priority={false}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        ) : (
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.798l-4.375-3.5a1 1 0 01-.383-.798V7.5a1 1 0 01.383-.798l4.375-3.5a1 1 0 01.617-.126zM14 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      <div className="space-y-1 md:space-y-2">
        <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 overflow-hidden text-ellipsis text-sm md:text-base">
          {title}
        </h3>
        <p className="text-gray-400 text-xs md:text-sm line-clamp-2 overflow-hidden text-ellipsis">
          {artistName}
        </p>
      </div>
    </div>
  );
}
