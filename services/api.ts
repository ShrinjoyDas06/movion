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
    console.log('GET', `${API_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
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


export const fetchAllMovies = () => {
  return [
    {
      "Title": "Breaking Bad",
      "Year": "2008–2013",
      "imdbID": "tt0903747",
      "Type": "series",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "The Twilight Saga: Breaking Dawn - Part 2",
      "Year": "2012",
      "imdbID": "tt1673434",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTcyMzUyMzY1OF5BMl5BanBnXkFtZTcwNDQ4ODk1OA@@._V1_SX300.jpg"
    },
    {
      "Title": "The Twilight Saga: Breaking Dawn - Part 1",
      "Year": "2011",
      "imdbID": "tt1324999",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNjBlY2M2MTctMzU3Yi00MTY3LTlkMTAtMzhlMzY1YjZlYTA2XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Breaking the Waves",
      "Year": "1996",
      "imdbID": "tt0115751",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYTdjYjg4MTAtMzU4Ny00ODVkLTlhZDItOThiMDBhODI4MTVhXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Breaking Away",
      "Year": "1979",
      "imdbID": "tt0078902",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYTNkMTA4YzktNmE3Mi00NjdjLWE4MzAtZjcwOTVmYmMxNGIwXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Breaking and Entering",
      "Year": "2006",
      "imdbID": "tt0443456",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTI3NzM3NDU4M15BMl5BanBnXkFtZTcwNjYzODgzMQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Breaking In",
      "Year": "2018",
      "imdbID": "tt7137846",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNTQwNjc3NjE5MF5BMl5BanBnXkFtZTgwNTEzMDg5NDM@._V1_SX300.jpg"
    },
    {
      "Title": "Breaking",
      "Year": "2022",
      "imdbID": "tt12311620",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BODA2NjJhZWMtOGIwOC00NGI2LWFlMmEtMmQ2YzVhN2VlYzgzXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Breaking In",
      "Year": "2011–2012",
      "imdbID": "tt1630574",
      "Type": "series",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjI1MTUwNjA1N15BMl5BanBnXkFtZTcwMjQ0NTM2Nw@@._V1_SX300.jpg"
    },
    {
      "Title": "Breaking News in Yuba County",
      "Year": "2021",
      "imdbID": "tt7737640",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMzg2MGVjNDctZWQ4Ni00MDEzLThkM2MtN2U0MjM5ZTg5ZTY1XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man: No Way Home",
      "Year": "2021",
      "imdbID": "tt10872600",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man",
      "Year": "2002",
      "imdbID": "tt0145487",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZWM0OWVmNTEtNWVkOS00MzgyLTkyMzgtMmE2ZTZiNjY4MmFiXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man: Homecoming",
      "Year": "2017",
      "imdbID": "tt2250912",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BODY2MTAzOTQ4M15BMl5BanBnXkFtZTgwNzg5MTE0MjI@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man 2",
      "Year": "2004",
      "imdbID": "tt0316654",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNGQ0YTQyYTgtNWI2YS00NTE2LWJmNDItNTFlMTUwNmFlZTM0XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man: Into the Spider-Verse",
      "Year": "2018",
      "imdbID": "tt4633694",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg"
    },
    {
      "Title": "The Amazing Spider-Man",
      "Year": "2012",
      "imdbID": "tt0948470",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man 3",
      "Year": "2007",
      "imdbID": "tt0413300",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BODE2NzNhMDctYjUzMC00Y2M5LWI2Y2EtODJkZTFjN2Y5ODlmXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man: Far from Home",
      "Year": "2019",
      "imdbID": "tt6320628",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMzNhNTE0NWQtN2E1Ny00NjcwLTg1YTctMGY1NmMwODJmY2NmXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "The Amazing Spider-Man 2",
      "Year": "2014",
      "imdbID": "tt1872181",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BOTA5NDYxNTg0OV5BMl5BanBnXkFtZTgwODE5NzU1MTE@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man: Across the Spider-Verse",
      "Year": "2023",
      "imdbID": "tt9362722",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNThiZjA3MjItZGY5Ni00ZmJhLWEwN2EtOTBlYTA4Y2E0M2ZmXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Demon Slayer: Kimetsu no Yaiba - Sibling's Bond",
      "Year": "2019",
      "imdbID": "tt14888860",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ0NDc4MWEtOTRjMC00YjBiLWE3ODQtYzlkM2IwNjlmMzQ1XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Becoming Bond",
      "Year": "2017",
      "imdbID": "tt6110504",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYTlkZDU0ZjItMzZlNC00ZjJlLWIyNGUtY2ZkZmVjOTkyNTQwXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "That Time I Got Reincarnated as a Slime the Movie: Scarlet Bond",
      "Year": "2022",
      "imdbID": "tt15467380",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BM2IwMDM4MDgtZWU2Zi00YjA2LWJhOTItNGUzMWM1N2E4ZTk3XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "James Bond 007: Everything or Nothing",
      "Year": "2003",
      "imdbID": "tt0366629",
      "Type": "game",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNzhiNjgxNGMtMzg0ZS00ODMwLTk5MTYtYzI0NDBmOThlZjY3XkEyXkFqcGdeQXVyNTEwNDY2MjU@._V1_SX300.jpg"
    },
    {
      "Title": "James Bond 007: Blood Stone",
      "Year": "2010",
      "imdbID": "tt1692489",
      "Type": "game",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTcxMzE4NDg0NF5BMl5BanBnXkFtZTgwMjg5Mjc1MDE@._V1_SX300.jpg"
    },
    {
      "Title": "Ek Rishtaa: The Bond of Love",
      "Year": "2001",
      "imdbID": "tt0284083",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZTQ5YzE5OGMtYzYwMS00ZTAzLWJkYmYtODFmMWY4YjVmY2NkXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Mad Mission 3: Our Man from Bond Street",
      "Year": "1984",
      "imdbID": "tt0088457",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNDM2MmZmYWEtOGQzOC00Yzk5LWExZDctOWI2ODdkMjkwZGRjXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "The Bond",
      "Year": "1918",
      "imdbID": "tt0008907",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYWVjYzBkNjMtNzNhNy00ZWYzLWE1MGYtMzc4ZWZmODA1YTA3XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Bond of Silence",
      "Year": "2010",
      "imdbID": "tt1659192",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZWJjNmYxOTgtNzcxNC00NWRlLWI4YTgtMDkxNzE2NGVlODFkXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Bond Girls Are Forever",
      "Year": "2002",
      "imdbID": "tt0353252",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYzMwZTAyMjctZWRhYy00ZTZmLWE0OGEtZWE4OGI4YmQ3YzkzXkEyXkFqcGc@._V1_SX300.jpg"
    }
  ]
}