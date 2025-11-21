import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'ru-RU', // Default to Russian
  },
});

export const getTrendingMovies = async () => {
  try {
    const response = await tmdbClient.get('/trending/movie/week');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const searchMovies = async (query: string) => {
  try {
    const response = await tmdbClient.get('/search/movie', {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getMovieDetails = async (id: string) => {
  try {
    const response = await tmdbClient.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos,credits,similar',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const getImageUrl = (path: string, size: 'w500' | 'original' = 'w500') => {
  if (!path) return '/placeholder.png'; // You might want to add a placeholder image
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

