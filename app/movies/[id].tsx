import { View, Text, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import useFetch from '@/services/useFetch';
import { fetchMovieDetails, fetchMovieTriller } from '@/services/api';
import { icons } from '@/constants/icons';
import { Link, router } from 'expo-router';
import * as Linking from 'expo-linking';
import { WebView } from 'react-native-webview';
import MovieDetailsSkeleton from '@/components/MovieDetailsSkeleton';
import * as Speech from 'expo-speech';
import { MovieContext } from '@/utils/MovieContext';
import { Bookmark } from 'lucide-react-native';
import Toast from 'react-native-toast-message';

interface movieInfoprop {
  label: string;
  value: string | number | null;
}

export const MovieInfo = ({ label, value }: movieInfoprop) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-slate-400 font-bold text-sm'>{label}</Text>
    <Text className='text-white font-normal text-lg mt-2'>{value || 'N/A'}</Text>
  </View>
);

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));
  const {data: triller, loading: loadingTriller} = useFetch(() => fetchMovieTriller(id as string))
  const { savedMovies, toggleSaveMovie } = useContext(MovieContext)
  const isSaved = savedMovies.some((m:any) => m.id === movie?.id);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const numDots = 10;
  const dotAnim = useRef([...Array(numDots)].map(() => new Animated.Value(0))).current;

const videoUrls = triller?.results?.map((video : any) => ({
  name: video.name,
  type: video.type,
  url: `https://www.youtube.com/watch?v=${video.key}`
}));

console.log(videoUrls)

  const handleSave = () => {
    toggleSaveMovie(movie);
    Toast.show({
      type: isSaved ? 'info' : 'success',
      text1: isSaved ? 'Movie Unsaved' : 'Movie Saved',
      text2: `${movie.title} has been ${isSaved ? 'removed from' : 'added to'} your saved list.`,
    });
  };

  const speakOverview = async () => {
    const currentlySpeaking = await Speech.isSpeakingAsync();
  
    if (currentlySpeaking) {
      await Speech.stop();
      setIsSpeaking(false);
      return;
    }

    if (movie?.overview) {
      setIsSpeaking(true);
      Speech.speak(movie.overview, {
        language: "en-US",
        pitch: 1.0,
        rate: 1.0,
        onStart: () => setIsSpeaking(true),
        onDone: () => setIsSpeaking(false),
      });
    } else{
      setIsSpeaking(true);
      Speech.speak("This movie has no overview to talk about.", {
        language: "en-US",
        pitch: 1.0,
        rate: 1.0,
        onStart: () => setIsSpeaking(true),
        onDone: () => setIsSpeaking(false),
      })
    }
  };

  useEffect(() => {
    if (isSpeaking) {
      dotAnim.forEach((anim, index) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 300,
              delay: index * 100,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    } else {
      dotAnim.forEach(anim => anim.setValue(0));
    }
  }, [isSpeaking]);

  const WaveAnimation = () => (
    <View className="flex-row justify-center items-center gap-1">
      {dotAnim.map((anim, index) => (
        <Animated.View
          key={index}
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: "white",
            transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) }],
          }}
        />
      ))}
    </View>
  );

  if (loading)
    return (
      <View className='flex-1 pt-[100px]'>
        <MovieDetailsSkeleton />
      </View>
    );

  return (
    <View className='flex-1 bg-[#030014]'>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
        {videoUrls?.length > 0 ?  (
          <View className="mt-5 h-[500px] w-full overflow-hidden rounded-lg">
            <WebView
              source={{ uri: `https://www.youtube.com/embed/${videoUrls[0].url.split('v=')[1]}` }}
              style={{ flex: 1 }}
              allowsFullscreenVideo
            />
          </View>
        ) : (
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} className='w-full h-[500px]' resizeMode='stretch' />
        )}
        </View>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{movie?.title}</Text>
          <View className='flex-row w-full justify-between items-center gap-2'>
            <View className='flex-row items-center gap-x-1 mt-2'>
              <Text className='text-white text-sm font-medium'>{movie?.release_date?.split('-')[0]}</Text>
              <Text className='text-white font-extrabold'>.</Text>
              <Text className='text-white text-sm font-medium'>{movie?.runtime}m</Text>
            </View>

            <View className='p-1 relative flex-row items-center gap-2 justify-center'>

              {videoUrls?.length > 0 && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(videoUrls[0].url)}
                  className="mt-4 px-4 py-3 bg-red-600 rounded-md flex-row items-center justify-center"
                >
                  <Text className="text-white font-bold text-base"> Watch on YouTube</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={handleSave}>
                <Bookmark
                size={30}
                color="white"
                fill={isSaved ? 'white' : 'transparent'}
              />
              </TouchableOpacity>
            </View>
          </View>

          <View className='self-start flex-row items-center bg-slate-700 px-2 py-2 rounded-md gap-x-1 mt-2'>
            <Image source={icons.star} className='size-4' />
            <Text className='text-white font-bold text-sm'>{Math.round(movie?.vote_average ?? 0)} / 10</Text>
            <Text className='text-white font-bold text-sm'>({movie?.vote_count} votes)</Text>
          </View>

          <MovieInfo label='Overview' value={movie?.overview} />

          <View className="flex-row items-center gap-2">
            <TouchableOpacity onPress={speakOverview} className="mt-3 px-4 py-4 bg-gray-500 rounded-md flex-row items-center">
              {isSpeaking && <WaveAnimation />}
              <Text className="text-white font-bold ml-2">
                {isSpeaking ? "🔊" : "🎤 Read Overview"}
              </Text>
            </TouchableOpacity>

          </View>

          <MovieInfo label='Genre' value={movie?.genres?.map((g: any) => g.name).join(' - ') || 'N/A'} />

          <View className='flex flex-row justify-between w-1/2 gap-2'>
            <MovieInfo label='Budget' value={`$${movie?.budget / 1_000_000} million`} />
            <MovieInfo label='Revenue' value={`$${Math.round(movie?.revenue) / 1_000_000} million`} />
          </View>

          <MovieInfo label='Production Companies' value={movie?.production_companies.map((c: any) => c.name).join(' - ') || 'N/A'} />

        </View>
      </ScrollView>

      <TouchableOpacity onPress={router.back} className='absolute bottom-5 left-0 right-0 mx-5 bg-slate-700 rounded-lg py-3.5 flex flex-row items-center justify-center z-50'>
        <Image source={icons.arrow} className='size-5 mt-1 mr-1 rotate-180' tintColor={'#ffffff'} />
        <Text className='text-white font-bold text-base'>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}