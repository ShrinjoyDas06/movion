import {
  FlatList,
  Image,
  ScrollView,
  Text,
  View
} from "react-native";

import { fetchAllMovies } from "@/services/api";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { useMemo, useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const movies = fetchAllMovies();
  const filteredMovies = useMemo(() => 
    movies.filter(movie => movie.Title.toLowerCase().includes(searchQuery.toLowerCase()))
  , [movies, searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={filteredMovies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.imdbID.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
          </View>
      </ScrollView>
    </View>
  );
};

export default Index;