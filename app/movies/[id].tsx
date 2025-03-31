import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails } from '@/services/api'
import { icons } from '@/constants/icons'
import { router } from 'expo-router'
import MovieDetailsSkeleton from '@/components/MovieDetailsSkeleton'


interface movieInfoprop{
  label: string,
  value: string | number | null
}

export const MovieInfo = ({ label, value}: movieInfoprop) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-slate-400 font-bold text-sm'>{label}</Text>
    <Text className='text-white font-normal text-lg mt-2'>{value || 'N/A'}</Text>
  </View>
)

export default function MovieDetails() {

  const { id } = useLocalSearchParams()

  const { data: movie, loading} = useFetch(() => fetchMovieDetails(id as string));

  if(loading) return (
    <View className='flex-1 bg-[#030014] pt-[100px]'>
      <MovieDetailsSkeleton />
    </View>
  )

  return (
    <View className='flex-1 bg-[#030014]'>
      <ScrollView contentContainerStyle={{ paddingBottom: 80}}>
        <View>
          <Image source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}} className='w-full h-[500px]' resizeMode='stretch' />
        </View>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{movie?.title}</Text>

          <View className='flex-row items-center  gap-x-1 mt-2'>
          <Text className='text-white text-sm font-medium'>{movie?.release_date?.split('-')[0]}</Text>
          <Text className='text-white font-extrabold'>.</Text>
          <Text className='text-white text-sm font-medium'>{movie?.runtime}m</Text>
        </View>

        <View className='self-start flex-row items-center bg-slate-700 px-2 py-2 rounded-md gap-x-1 mt-2'>
          <Image source={icons.star} className='size-4' />
          <Text className='text-white font-bold text-sm'>{Math.round(movie?.vote_average ?? 0 )} / 10</Text>
          <Text className='text-white font-bold text-sm'>({movie?.vote_count} votes)</Text>
        </View>

        <MovieInfo label='Overview' value={movie?.overview} />

        <MovieInfo label='Genre' value={movie?.genres?.map((g: any) => g.name).join(' - ') || 'N/A'} />

          <View className='flex flex-row justify-between w-1/2'>
            <MovieInfo label='Budget' value={`$${movie?.budget / 1_000_000} million`} />
            <MovieInfo label='Revenue' value={`$${Math.round(movie?.budget) / 1_000_000}`} />
          </View>

          <MovieInfo label='Production Companies' value={movie?.production_companies.map((c: any) => c.name).join(' - ') || 'N/A'} />

        </View>
      </ScrollView>

      <TouchableOpacity onPress={router.back} className='absolute bottom-5 left-0 right-0 mx-5 bg-slate-700 rounded-lg py-3.5 flex flex-row items-center justify-center z-50'>
        <Image source={icons.arrow} className='size-5 mt-1 mr-1 rotate-180' tintColor={"#ffffff"} />
        <Text className='text-white font-bold text-base'>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}