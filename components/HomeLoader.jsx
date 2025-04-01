import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

const SkeletonLoader = () => {
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 0.6,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const SkeletonItem = ({ index }) => (
    <View className="w-[30%]">
      <Animated.View
        className="h-52 rounded-lg bg-gray-800 mb-2"
        style={{ opacity: pulseAnimation }}
      />
      <Animated.View 
        className="h-4 rounded bg-gray-800 w-4/5" 
        style={{ opacity: pulseAnimation }}
      />
    </View>
  );

  return (
    <View className="flex-1 justify-center items-center">
      <View className="w-full">
        <View className="flex-row justify-between mb-5">
          {[0, 1, 2].map((index) => (
            <SkeletonItem key={index} index={index} />
          ))}
        </View>
        <View className="flex-row justify-between mb-5">
          {[3, 4, 5].map((index) => (
            <SkeletonItem key={index} index={index} />
          ))}
        </View>
        <View className="flex-row justify-between">
          {[6, 7, 8].map((index) => (
            <SkeletonItem key={index} index={index} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default SkeletonLoader;