import { getMovieDetails, getImageUrl } from '@/lib/tmdb';
import Image from 'next/image';
import { Calendar, Star, Clock } from 'lucide-react';

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    return <div className="text-center py-20 text-red-500">Не удалось загрузить информацию о фильме</div>;
  }

  // Find a trailer (Youtube)
  const trailer = movie.videos?.results.find(
    (video: any) => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
  );

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Backdrop */}
      <div className="relative h-[40vh] md:h-[60vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10" />
        {movie.backdrop_path && (
          <Image
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            fill
            className="object-cover opacity-50"
            priority
          />
        )}
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-20 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 w-64 md:w-80 mx-auto md:mx-0 rounded-xl overflow-hidden shadow-2xl shadow-sky-900/20">
            <Image
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              width={320}
              height={480}
              className="w-full h-auto"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            {movie.tagline && <p className="text-xl text-slate-400 italic mb-6">{movie.tagline}</p>}

            <div className="flex flex-wrap gap-4 mb-8 text-sm">
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-yellow-400">{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{movie.runtime} мин.</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-sky-400">Описание</h2>
              <p className="text-lg text-slate-300 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Trailer */}
            {trailer && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-sky-400">Трейлер</h2>
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
            
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 text-slate-400 text-sm">
               <p>Примечание: Данный сайт использует API TMDB для отображения информации. Полный просмотр фильмов доступен только через официальные стриминговые сервисы.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

