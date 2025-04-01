import { View, Text, Image, FlatList } from 'react-native';
import React, { useContext } from 'react';
import { icons } from '@/constants/icons';
import MovieCard from '@/components/MovieCard';
import { MovieContext } from '@/utils/MovieContext';
import { Link } from 'expo-router';
import Logo from '@/components/Logo';

export default function Saved() {
  const { savedMovies } = useContext(MovieContext);

  return (
    <View className="flex-1 bg-[#030014] px-5">
      <View className="flex justify-center items-center mt-5">
        <Logo />
        <Text className="text-white font-bold text-lg">Saved Movies</Text>
      </View>
      {savedMovies.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Image source={icons.save} className="size-10" tintColor="#fff" />
          <Text className="text-gray-500 text-base mt-5">No saved movies yet</Text>
        </View>
      ) : (
        <FlatList
          data={savedMovies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{                   
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            paddingBottom: 10
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
          className="mt-5 pb-32"
          scrollEnabled={false}
        />
      )}
    </View>
  );
}