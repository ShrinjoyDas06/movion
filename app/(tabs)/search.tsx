import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import { fetchMovies } from "@/services/api";

import MovieDisplayCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { Movie } from "@/type/movie";

function useDebounce<T>(value: T, delay: number): T {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: This is crucial!
    // If the value changes (user types again) before the timeout finishes,
    // the previous timeout is cancelled.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Rerun the effect if value or delay changes

  return debouncedValue;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  // 1. Create a debounced version of the search query
  // We'll use a 500ms (0.5 second) delay.
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // 2. The useEffect now only runs when the debounced query changes
  useEffect(() => {
    // Important: Only fetch if the query is not empty after debouncing
    // You might want to remove this check if you want to show all movies 
    // when the search box is cleared.
    if (debouncedSearchQuery) { 
      // Use an IIFE for the async call inside useEffect
      (async () => {
        console.log(`Fetching movies for: ${debouncedSearchQuery}`);
        const data = await fetchMovies(debouncedSearchQuery);
        setMovies(data);
      })();
    } else {
        // Clear results when the search box is empty/cleared
        setMovies([]);
    }

    // A note on the dependency array:
    // We only depend on 'debouncedSearchQuery'. 
    // You must REMOVE 'movies' from the dependency array 
    // to prevent infinite loops, as 'movies' is updated *inside* the effect.
  }, [debouncedSearchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        className="px-5"
        data={movies ?? []}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => <MovieDisplayCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )} */}
          </>
        }
        ListEmptyComponent={
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
        }
      />
    </View>
  );
};

export default Search;