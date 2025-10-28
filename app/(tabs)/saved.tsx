import MovieDisplayCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Movie } from "@/type/movie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

const Saved = () => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSavedMovies = async () => {
    try {
      setLoading(true);
      const saved = await AsyncStorage.getItem("savedMovies");
      const movies = saved ? JSON.parse(saved) : [];
      setSavedMovies(movies);
    } catch (error) {
      console.error("Error loading saved movies:", error);
      setSavedMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Re-run when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      loadSavedMovies();
    }, [])
  );

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        className="px-5"
        data={savedMovies}
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
              <Text className="text-3xl text-white font-bold text-center">
                Saved Movies
              </Text>
              <Text className="text-gray-400 text-center mt-2">
                Your favorite movies collection
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View className="mt-10 px-5">
            <Text className="text-center text-gray-500 text-lg">
              {loading
                ? "Loading saved movies..."
                : "No saved movies yet. Start adding your favorites!"}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Saved;
