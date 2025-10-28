import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Movie } from "@/type/movie";

const MovieCard = ({
  imdbID,
  Poster,
  Title,
  Year,
}: Movie) => {
  return (
    <Link href={`/movies/${imdbID}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: Poster
              ? `https://image.tmdb.org/t/p/w500${Poster}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {Title}
        </Text>

        {/* <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View> */}

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {Year}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;