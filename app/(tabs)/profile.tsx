import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Movie } from "@/type/movie";

const Profile = () => {
  const [user] = useState({
    name: "Shrinjoy Das",
    username: "@shrinjoydas",
    bio: "Movie lover • Critic • Always chasing great stories 🍿",
  });

  const [watchedMovies, setWatchedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWatchedMovies = async () => {
    try {
      setLoading(true);
      const watched = await AsyncStorage.getItem("watchedMovies");
      const movies = watched ? JSON.parse(watched) : [];
      setWatchedMovies(movies);
    } catch (error) {
      console.error("Error loading watched movies:", error);
      setWatchedMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Refresh count when the Profile screen is focused
  useFocusEffect(
    useCallback(() => {
      loadWatchedMovies();
    }, [])
  );

  return (
    <View className="flex-1 bg-primary">
      {/* Background */}
      <Image
        source={images.bg}
        className="absolute w-full h-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 30 }}
      >
        {/* App Logo */}
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {/* Profile Info */}
        <View className="items-center mt-6">
          <Text className="text-white text-xl font-bold mt-4">{user.name}</Text>
          <Text className="text-gray-300 text-sm">{user.username}</Text>
          <Text className="text-gray-300 text-center mt-3 px-10">
            {user.bio}
          </Text>
        </View>

        {/* Stats Section */}
        <View className="flex-row justify-center mt-6 space-x-12">
          <View className="items-center">
            <Text className="text-white text-xl font-bold">
              {loading ? "…" : watchedMovies.length}
            </Text>
            <Text className="text-gray-400 text-sm">Watched Movies</Text>
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-row justify-center mt-8 space-x-4">
          <TouchableOpacity className="bg-secondary px-6 py-3 rounded-2xl">
            <Text className="text-white font-semibold">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Watched Movies Preview Section */}
        <View className="mt-10">
          <Text className="text-lg text-white font-bold mb-3">
            Your Watched Movies
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row space-x-4"
          >
            {watchedMovies.length > 0 ? (
              watchedMovies.slice(0, 5).map((movie) => (
                <View
                  key={movie.imdbID}
                  className="w-[110px] h-[165px] bg-white/5 rounded-2xl overflow-hidden"
                  style={{
                    shadowColor: "#000",
                    shadowOpacity: 0.25,
                    shadowRadius: 3,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 3,
                  }}
                >
                  <Image
                    source={{ uri: movie.Poster }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              ))
            ) : (
              <Text className="text-gray-400 text-sm mt-2">
                {loading ? "Loading..." : "No watched movies yet."}
              </Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
