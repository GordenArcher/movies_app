import SkeletonLoader from "@/components/HomeLoader";
import MovieCard from "@/components/MovieCard";
import Searchbar from "@/components/Searchbar";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router } from "expo-router";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Logo from '@/components/Logo'

export default function Index() {
  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError 
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-[#030014]">
      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Logo />
        
        {moviesLoading ? (
          <SkeletonLoader />
        ) : moviesError ? (
          <Text className="text-white text-center mt-5">Error loading movies. Please try again.
          <TouchableOpacity>
            Refresh
          </TouchableOpacity>
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <Searchbar 
              onPress={() => router.push('/search')}
              placeholder="Search for a movie"
            />

            <Text className="text-white text-lg font-extrabold mt-5 mb-3">
              Latest Movies
            </Text>

            <FlatList 
              data={movies}
              renderItem={({ item }) => (
                <MovieCard 
                  movie={item} 
                  containerStyle={{ width: '30%' }}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent:"flex-start",
                gap: 15,
                marginBottom: 20
              }}
              contentContainerStyle={{
                paddingBottom: 80
              }}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}