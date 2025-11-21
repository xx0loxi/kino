import { searchMovies } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import SearchInput from '@/components/SearchInput'; // Need to create this

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const params = await searchParams;
  const query = params.q || '';
  const movies = query ? await searchMovies(query) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Поиск фильмов</h1>
      <div className="mb-8">
        <SearchInput initialQuery={query} />
      </div>
      
      {query && (
        <h2 className="text-xl text-slate-400 mb-6">Results for "{query}"</h2>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie: any) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
            release_date={movie.release_date}
          />
        ))}
        {query && movies.length === 0 && (
          <div className="col-span-full text-center text-slate-500 py-12">
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
}

