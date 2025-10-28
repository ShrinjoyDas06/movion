import { fetchMovieDetails } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { MovieDetails } from '@/type/movie';

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

  // Fetch movie details
  useEffect(() => {
    (async () => {
      const data = await fetchMovieDetails(id);
      setMovieDetails(data);
      checkIfSaved(data.imdbID);
    })();
  }, []);

  // Check if the movie is already saved
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

  // Handle save or remove
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
            <Image source={icons.home} className="w-6 h-6" />
          </TouchableOpacity>
          <Image source={icons.logo} className="w-10 h-8" />
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

          {/* ⭐ Save Button */}
          <TouchableOpacity
            onPress={handleSaveMovie}
            className={`${
              isSaved ? "bg-red-500" : "bg-yellow-500"
            } rounded-full px-4 py-2 mt-4 self-start`}
          >
            <Text className="text-black font-bold">
              {isSaved ? "❌ Remove Movie" : "⭐ Save Movie"}
            </Text>
          </TouchableOpacity>

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
