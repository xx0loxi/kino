import { getTrendingMovies } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';

export default async function Home() {
  const movies = await getTrendingMovies();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Тренды недели</h1>
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
      </div>
    </div>
  );
}
