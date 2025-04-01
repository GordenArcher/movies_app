import { View, Text } from 'react-native'
import React from 'react'
import Animated, { 
  FadeInDown, 
  LightSpeedInLeft, 
  BounceIn, 
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const Logo = () => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  rotation.value = withRepeat(
    withTiming(10, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
    -1,
    true
  );

  scale.value = withRepeat(
    withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
    -1,
    true
  );

  // Animation for the outer container
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value }
    ]
  }));

  // Animation for the gradient background
  const gradientAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value * 0.5}deg` }
    ]
  }));

  return (
    <View className="mt-20 mb-5 mx-auto items-center">
      {/* Outer wrapper for layout */}
      <View>
        {/* Animation wrapper - handles transform animations */}
        <Animated.View 
          entering={LightSpeedInLeft.duration(1000)}
          style={containerAnimatedStyle}
        >
          {/* Static container for layout */}
          <View>
            <AnimatedGradient
              colors={['#FF0080', '#7928CA', '#FF0080']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="px-6 py-3 rounded-full"
              style={gradientAnimatedStyle}
            >
              <AnimatedText 
                entering={FadeInDown.delay(300).duration(800)}
                className="text-white text-2xl font-bold tracking-widest"
              >
                G-Movies
              </AnimatedText>
            </AnimatedGradient>
          </View>
        </Animated.View>
      </View>

      <Animated.View 
        entering={BounceIn.delay(800).duration(1000)}
        className="mt-2"
      >
        <Text className="text-gray-400 text-xs font-light tracking-widest">
          Unlimited Entertainment
        </Text>
      </Animated.View>
    </View>
  );
};

export default Logo;