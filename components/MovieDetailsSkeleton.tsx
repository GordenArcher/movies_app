import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, SafeAreaView, ScrollView } from 'react-native';

const MovieDetailsSkeleton = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1">
        {/* Poster skeleton */}
        <Animated.View 
          className="w-full h-96 bg-gray-800"
          style={{ opacity }}
        />
        
        {/* Title area */}
        <View className="p-6">
          <Animated.View 
            className="h-10 w-2/3 bg-gray-800 rounded-md mb-3"
            style={{ opacity }}
          />
          
          <Animated.View 
            className="h-5 w-1/3 bg-gray-800 rounded-md mb-4"
            style={{ opacity }}
          />
          
          {/* Rating skeleton */}
          <Animated.View 
            className="h-8 w-32 bg-gray-800 rounded-md mb-6"
            style={{ opacity }}
          />
          
          {/* Overview section */}
          <Animated.View 
            className="h-5 w-1/3 bg-gray-800 rounded-md mb-3"
            style={{ opacity }}
          />
          
          <Animated.View 
            className="h-4 w-full bg-gray-800 rounded-md mb-2"
            style={{ opacity }}
          />
          <Animated.View 
            className="h-4 w-full bg-gray-800 rounded-md mb-2"
            style={{ opacity }}
          />
          <Animated.View 
            className="h-4 w-11/12 bg-gray-800 rounded-md mb-6"
            style={{ opacity }}
          />
          
          {/* Genre section */}
          <Animated.View 
            className="h-5 w-1/4 bg-gray-800 rounded-md mb-3"
            style={{ opacity }}
          />
          <Animated.View 
            className="h-4 w-1/2 bg-gray-800 rounded-md mb-6"
            style={{ opacity }}
          />
          
          {/* Budget & Revenue */}
          <View className="flex-row mb-6">
            <View className="flex-1 mr-4">
              <Animated.View 
                className="h-5 w-1/2 bg-gray-800 rounded-md mb-3"
                style={{ opacity }}
              />
              <Animated.View 
                className="h-4 w-2/3 bg-gray-800 rounded-md"
                style={{ opacity }}
              />
            </View>
            <View className="flex-1">
              <Animated.View 
                className="h-5 w-1/2 bg-gray-800 rounded-md mb-3"
                style={{ opacity }}
              />
              <Animated.View 
                className="h-4 w-1/3 bg-gray-800 rounded-md"
                style={{ opacity }}
              />
            </View>
          </View>
          
          {/* Production Companies */}
          <Animated.View 
            className="h-5 w-3/4 bg-gray-800 rounded-md mb-3"
            style={{ opacity }}
          />
          <Animated.View 
            className="h-4 w-1/2 bg-gray-800 rounded-md mb-10"
            style={{ opacity }}
          />
        </View>
      </ScrollView>
      
      {/* Go Back button */}
      <Animated.View 
        className="mx-6 mb-8 h-14 bg-gray-800 rounded-lg"
        style={{ opacity }}
      />
    </SafeAreaView>
  );
};

export default MovieDetailsSkeleton;