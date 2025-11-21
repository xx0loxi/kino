import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/tmdb';
import { Star } from 'lucide-react';

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export default function MovieCard({ id, title, poster_path, vote_average, release_date }: MovieCardProps) {
  return (
    <Link href={`/movie/${id}`} className="group relative block bg-slate-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200">
      <div className="relative aspect-[2/3] w-full bg-slate-700">
        {poster_path ? (
          <Image
            src={getImageUrl(poster_path)}
            alt={title}
            fill
            className="object-cover group-hover:opacity-90 transition-opacity"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">No Image</div>
        )}
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-md flex items-center gap-1 text-xs font-bold text-yellow-400 backdrop-blur-sm">
          <Star className="w-3 h-3 fill-yellow-400" />
          {vote_average.toFixed(1)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white truncate group-hover:text-sky-400 transition-colors">{title}</h3>
        <p className="text-sm text-slate-400 mt-1">{release_date ? new Date(release_date).getFullYear() : 'N/A'}</p>
      </div>
    </Link>
  );
}

