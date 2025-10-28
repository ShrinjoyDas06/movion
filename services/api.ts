import type { Movie, MovieDetails } from "../type/movie";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "243e9996"; // Your OMDb API key

/**
 * Search movies by title
 */
export const fetchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${API_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
    );
    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "No movies found");
    }

    return data.Search;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

/**
 * Fetch movie details by IMDb ID
 */
export const fetchMovieDetails = async (
  imdbID: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(`${API_URL}?i=${imdbID}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "Movie not found");
    }

    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
