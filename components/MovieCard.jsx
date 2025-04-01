import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';
import { Link } from 'expo-router';
import { icons } from '@/constants/icons';
import { Bookmark } from 'lucide-react-native';
import {MovieContext} from '@/utils/MovieContext'
import Toast from 'react-native-toast-message'; // Import Toast

const MovieCard = ({ movie }) => {
  const { savedMovies, toggleSaveMovie } = useContext(MovieContext);
  const isSaved = savedMovies.some((m) => m.id === movie.id);

  const handleSave = () => {
    toggleSaveMovie(movie);
    Toast.show({
      type: isSaved ? 'info' : 'success',
      text1: isSaved ? 'Movie Unsaved' : 'Movie Saved',
      text2: `${movie.title} has been ${isSaved ? 'removed from' : 'added to'} your saved list.`,
    });
  };

  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://placeholder.co/600x500/1a1a1a/ffffff.png',
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="font-bold text-white text-sm mt-2" numberOfLines={1}>
          {movie.title}
        </Text>
        <View className="flex-row items-center justify-between gap-2">
          <View className="flex-row items-center justify-start gap-x-1">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white text-xs font-bold uppercase">
              {Math.round(movie.vote_average / 2)}
            </Text>
          </View>
          <TouchableOpacity onPress={handleSave}>
            <Bookmark
              size={24}
              color="white"
              fill={isSaved ? 'white' : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-slate-300 font-medium mt-1">
            {movie.release_date?.split('-')[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;