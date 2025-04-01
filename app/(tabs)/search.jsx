import { View, Text, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies, fetchRecommendations } from '@/services/api'
import Searchbar from '@/components/Searchbar'
import Logo from '@/components/Logo'
import Loader from '../../components/HomeLoader'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [recommendations, setRecommendations] = useState([])

  const { 
    data: movies, 
    loading, 
    error,
    refetch,
    reset
  } = useFetch(() => fetchMovies({ query: searchQuery }))

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch()
      } else {
        reset()
        setRecommendations([])
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  useEffect(() => {
    const fetchRecs = async () => {
      if (movies?.length > 0) {
        try {
          const recs = await fetchRecommendations(movies[0].id)
          setRecommendations(recs)
        } catch (err) {
          console.error('Error fetching recommendations:', err)
        }
      } else {
        setRecommendations([])
      }
    }

    fetchRecs()
  }, [movies])

  return (
    <View className='flex-1 bg-[#030014]'>
      <ScrollView 
        contentContainerStyle={{ 
          paddingBottom: 20,
          flexGrow: 1 
        }}
      >
        <FlatList 
          data={movies} 
          renderItem={({ item }) => (
            <MovieCard movie={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
          className="mt-5"
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start", 
            gap: 20,
            marginVertical: 16
          }}
          contentContainerStyle={{ paddingBottom: 20 }}
          scrollEnabled={false}
          ListHeaderComponent={
            <>
              <View className='w-full flex-row mt-5 justify-center items-center'>
                <Logo />
              </View>

              <View className='my-5'>
                <Searchbar 
                  placeholder='Search movies...' 
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                />
              </View>

              {loading && (
                <Loader />
              )}

              {error && (
                <Text className='text-red-500 px-5 my-3'>
                  {error?.message}
                </Text>
              )}

              {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
                <Text className='text-white text-xl font-bold px-5'>
                  Search results for{' '}
                  <Text className='text-violet-500'>{searchQuery}</Text>
                </Text>
              )}
            </>
          }
          ListEmptyComponent={
            !loading && !error ? (
              <View className='mt-10 px-5'>
                <Text className='text-center text-gray-500'>
                  {searchQuery.trim() ? "No movies found" : "Search for movies"}
                </Text>
              </View>
            ) : null
          }

          ListFooterComponent={
            (recommendations.length > 0 && !loading && !error && (
              <View className='px-5 mt-4 mb-20'>
                <Text className='text-white text-xl font-bold mb-4'>
                  Recommended Movies
                </Text>
                <FlatList
                  data={recommendations.slice(0, 6)}
                  renderItem={({ item }) => (
                    <MovieCard movie={item} />
                  )}
                  keyExtractor={(item) => `rec-${item.id}`}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    marginVertical: 16
                  }}
                  contentContainerStyle={{ paddingBottom: 20 }}
                  scrollEnabled praia={false}
                />
              </View>
            ))
          }
        /> 
      </ScrollView>
    </View>
  )
}

export default Search