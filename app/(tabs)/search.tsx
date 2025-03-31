import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import Searchbar from '@/components/Searchbar'

const search = () => {

  const [searchQuery, setSearchQuery] = useState("")

  const { 
    data: movies, 
    loading, 
    error ,
    refetch,
    reset
  } = 
  useFetch(() => 
    fetchMovies({ query : searchQuery})
  )


  useEffect(() => {
    const timeoutid = setTimeout(async () => {
      if(searchQuery.trim()){
            await refetch()
          }
          else{
            reset()
          }
    }, 500)

    return () => clearTimeout(timeoutid)
  }, [searchQuery])

  return (
    <View className='flex-1 bg-[#030014]'>
        <Image source={images.bg} className="absolute w-full z-0" />

        <FlatList 
            data={movies}
            renderItem={({ item }) => (
              <MovieCard {...item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            className="mt-5"
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              marginVertical: 16
            }}
            contentContainerStyle={{ paddingBottom: 100}}
            ListHeaderComponent={
              <>
                <View className='w-full flex-row  justify-center mt-20 items-center'>
                  <Image source={icons.logo} />
                </View>

                <View className='my-5'>
                  <Searchbar 
                    placeholder='Search movies...' 
                    value={searchQuery}
                    onChangeText={(text: string) => setSearchQuery(text)}
                  />
                </View>


                {loading && (
                  <ActivityIndicator size={'large'} color={"#0000ff"} />
                )}

                {error && (
                  <Text className='text-red-500 px-5 my-3'>
                    {error?.message}
                  </Text>
                )}

                {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
                  <Text className='text-white text-xl font-bold'>
                    Search results for {''}
                    <Text className='text-violet-500'>{searchQuery}</Text>
                  </Text>
                )}
              </>
            }
            ListEmptyComponent={
              !loading && !error ?(
                <View className='mt-10 px-5'>
                  <Text className='text-center text-gray-500'>
                    {searchQuery.trim() ? "No movies found" : "Search for movies"}
                  </Text>
                </View>

              ): null
            }
          />
    </View>
  )
}

export default search