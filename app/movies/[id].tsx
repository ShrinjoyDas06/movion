import { fetchMovieDetails } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { images } from "@/constants/images";
import { MovieDetails } from '@/type/movie';
import Ionicons from '@expo/vector-icons/Ionicons';

const MovieDetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [movieDetails, setMovieDetails] = useState<MovieDetails>({
    Title: "",
    Year: "",
    imdbID: "",
    Type: "",
    Poster: "",
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  // Fetch movie details and check saved/watched state
  useEffect(() => {
    (async () => {
      const data = await fetchMovieDetails(id);
      setMovieDetails(data);
      checkIfSaved(data.imdbID);
      checkIfWatched(data.imdbID);
    })();
  }, []);

  // Check if movie is saved
  const checkIfSaved = async (imdbID: string) => {
    try {
      const saved = await AsyncStorage.getItem("savedMovies");
      const savedMovies = saved ? JSON.parse(saved) : [];
      const exists = savedMovies.some((m: MovieDetails) => m.imdbID === imdbID);
      setIsSaved(exists);
    } catch (error) {
      console.error("Error checking saved movies:", error);
    }
  };

  // Check if movie is watched
  const checkIfWatched = async (imdbID: string) => {
    try {
      const watched = await AsyncStorage.getItem("watchedMovies");
      const watchedMovies = watched ? JSON.parse(watched) : [];
      const exists = watchedMovies.some((m: MovieDetails) => m.imdbID === imdbID);
      setIsWatched(exists);
    } catch (error) {
      console.error("Error checking watched movies:", error);
    }
  };

  // Handle Save / Remove Movie
  const handleSaveMovie = async () => {
    try {
      const saved = await AsyncStorage.getItem("savedMovies");
      const savedMovies = saved ? JSON.parse(saved) : [];

      const alreadySaved = savedMovies.some(
        (m: MovieDetails) => m.imdbID === movieDetails.imdbID
      );

      let updatedMovies;
      if (alreadySaved) {
        updatedMovies = savedMovies.filter(
          (m: MovieDetails) => m.imdbID !== movieDetails.imdbID
        );
        setIsSaved(false);
      } else {
        updatedMovies = [...savedMovies, movieDetails];
        setIsSaved(true);
      }

      await AsyncStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };

  // Handle Mark as Watched / Unmark
  const handleToggleWatched = async () => {
    try {
      const watched = await AsyncStorage.getItem("watchedMovies");
      const watchedMovies = watched ? JSON.parse(watched) : [];

      const alreadyWatched = watchedMovies.some(
        (m: MovieDetails) => m.imdbID === movieDetails.imdbID
      );

      let updatedMovies;
      if (alreadyWatched) {
        updatedMovies = watchedMovies.filter(
          (m: MovieDetails) => m.imdbID !== movieDetails.imdbID
        );
        setIsWatched(false);
      } else {
        updatedMovies = [...watchedMovies, movieDetails];
        setIsWatched(true);
      }

      await AsyncStorage.setItem("watchedMovies", JSON.stringify(updatedMovies));
    } catch (error) {
      console.error("Error updating watched movies:", error);
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Header with back button */}
        <View className="px-5 pt-12 pb-4 flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Poster and Title Section */}
        <View className="px-5 mt-4">
          <View className="flex-row">
            <Image
              source={{ uri: movieDetails.Poster }}
              className="w-32 h-48 rounded-lg"
              resizeMode="cover"
            />
            <View className="flex-1 ml-4 justify-between">
              <View>
                <Text className="text-2xl text-white font-bold">
                  {movieDetails.Title}
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                  {movieDetails.Year} • {movieDetails.Type}
                </Text>
                {movieDetails.Rated && (
                  <View className="bg-white/10 self-start px-2 py-1 rounded mt-2">
                    <Text className="text-white text-xs font-semibold">
                      {movieDetails.Rated}
                    </Text>
                  </View>
                )}
              </View>

              {/* IMDb Rating */}
              {movieDetails.imdbRating && (
                <View className="flex-row items-center mt-2">
                  <Text className="text-yellow-400 text-3xl font-bold">
                    {movieDetails.imdbRating}
                  </Text>
                  <Text className="text-gray-400 text-sm ml-1">/10</Text>
                </View>
              )}
            </View>
          </View>

          
          <View className="flex-row justify-center mt-4 gap-3">
            <TouchableOpacity
            onPress={handleSaveMovie}
            className={`${
            isSaved ? "bg-red-500" : "bg-yellow-500"
            } rounded-full px-3 py-3 w-[48%] items-center justify-center`}
        >
            <Text className="text-black font-bold text-sm">
                {isSaved ? "Remove Movie" : "Save Movie"}
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
    onPress={handleToggleWatched}
    className={`${
      isWatched ? "bg-green-500" : "bg-blue-500"
    } rounded-full px-3 py-3 w-[48%] items-center justify-center`}
  >
    <Text className="text-white font-bold text-sm">
      {isWatched ? "Watched" : "Mark as Watched"}
    </Text>
  </TouchableOpacity>
</View>

          {/* Quick Info */}
          {(movieDetails.Runtime || movieDetails.Genre) && (
            <View className="flex-row flex-wrap mt-4 gap-2">
              {movieDetails.Runtime && (
                <View className="bg-white/5 px-3 py-1.5 rounded-full">
                  <Text className="text-white text-xs">{movieDetails.Runtime}</Text>
                </View>
              )}
              {movieDetails.Genre?.split(", ").map((genre, index) => (
                <View key={index} className="bg-white/5 px-3 py-1.5 rounded-full">
                  <Text className="text-white text-xs">{genre}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Plot */}
        {movieDetails.Plot && (
          <View className="px-5 mt-6">
            <Text className="text-lg text-white font-bold mb-2">Plot</Text>
            <Text className="text-gray-300 text-sm leading-5">
              {movieDetails.Plot}
            </Text>
          </View>
        )}

        {/* Ratings */}
        {movieDetails.Ratings && movieDetails.Ratings.length > 0 && (
          <View className="px-5 mt-6">
            <Text className="text-lg text-white font-bold mb-3">Ratings</Text>
            <View className="flex-row flex-wrap gap-3">
              {movieDetails.Ratings.map(
                (rating: { Source: string; Value: string }, index: number) => (
                  <View
                    key={index}
                    className="bg-white/5 px-4 py-3 rounded-lg flex-1 min-w-[45%]"
                  >
                    <Text className="text-gray-400 text-xs mb-1">
                      {rating.Source}
                    </Text>
                    <Text className="text-white font-bold">{rating.Value}</Text>
                  </View>
                )
              )}
            </View>
          </View>
        )}

        {/* Cast and Crew */}
        <View className="px-5 mt-6">
          {movieDetails.Director && (
            <View className="mb-3">
              <Text className="text-gray-400 text-xs mb-1">Director</Text>
              <Text className="text-white font-semibold">{movieDetails.Director}</Text>
            </View>
          )}
          {movieDetails.Writer && (
            <View className="mb-3">
              <Text className="text-gray-400 text-xs mb-1">Writer</Text>
              <Text className="text-white font-semibold">{movieDetails.Writer}</Text>
            </View>
          )}
          {movieDetails.Actors && (
            <View className="mb-3">
              <Text className="text-gray-400 text-xs mb-1">Cast</Text>
              <Text className="text-white font-semibold">{movieDetails.Actors}</Text>
            </View>
          )}
        </View>

        {/* Additional Info */}
        <View className="px-5 mt-6">
          <Text className="text-lg text-white font-bold mb-3">Details</Text>
          <View className="bg-white/5 rounded-lg p-4 space-y-3">
            {movieDetails.Released && (
              <View className="flex-row justify-between py-2 border-b border-white/5">
                <Text className="text-gray-400 text-sm">Release Date</Text>
                <Text className="text-white text-sm">{movieDetails.Released}</Text>
              </View>
            )}
            {movieDetails.Language && (
              <View className="flex-row justify-between py-2 border-b border-white/5">
                <Text className="text-gray-400 text-sm">Language</Text>
                <Text className="text-white text-sm">{movieDetails.Language}</Text>
              </View>
            )}
            {movieDetails.Country && (
              <View className="flex-row justify-between py-2 border-b border-white/5">
                <Text className="text-gray-400 text-sm">Country</Text>
                <Text className="text-white text-sm">{movieDetails.Country}</Text>
              </View>
            )}
            {movieDetails.BoxOffice && (
              <View className="flex-row justify-between py-2 border-b border-white/5">
                <Text className="text-gray-400 text-sm">Box Office</Text>
                <Text className="text-white text-sm">{movieDetails.BoxOffice}</Text>
              </View>
            )}
            {movieDetails.Awards && (
              <View className="flex-row justify-between py-2">
                <Text className="text-gray-400 text-sm">Awards</Text>
                <Text className="text-white text-sm text-right flex-1 ml-4">
                  {movieDetails.Awards}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetailsPage;
