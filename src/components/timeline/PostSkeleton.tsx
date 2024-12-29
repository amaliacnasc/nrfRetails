import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';

export default function PostSkeleton() {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateOpacity = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateOpacity();
  }, []);

  return (
    <View className="p-4">
      {[1, 2, 3].map((index) => (
        <Animated.View
          key={index}
          className="bg-gray-200 rounded-lg shadow-md mb-5 overflow-hidden"
          style={{ opacity }}
        >
          <View className="w-full h-52 bg-gray-300"></View>
          <View className="p-4">
            <View className="h-6 bg-gray-300 rounded-md w-3/4 mb-2"></View>
            <View className="h-4 bg-gray-300 rounded-md w-1/2 mb-4"></View>
            <View className="h-4 bg-gray-300 rounded-md w-1/4"></View>
          </View>
        </Animated.View>
      ))}
    </View>
  );
}