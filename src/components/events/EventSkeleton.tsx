import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';

export default function EventSkeleton() {
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
  }, [opacity]);

  return (
    <View className="p-4">
      {[1, 2, 3].map((index) => (
        <Animated.View
          key={index}
          className="bg-gray-200 rounded-lg p-4 shadow-sm my-2"
          style={{ opacity }}
        >
          <View className="flex-row justify-between items-center mb-3">
            <View className="bg-gray-300 h-4 w-3/5 rounded-md"></View>
            <View className="bg-gray-300 h-4 w-10 rounded-md"></View>
          </View>
          <View className="flex-row items-center mb-3">
            <View className="bg-gray-300 h-4 w-24 rounded-md mr-4"></View>
            <View className="bg-gray-300 h-4 w-16 rounded-md"></View>
          </View>
          <View className="bg-gray-300 h-6 w-1/2 rounded-md mb-2"></View>
          <View className="bg-gray-300 h-4 w-full rounded-md mb-3"></View>
          <View className="bg-gray-300 h-4 w-4/5 rounded-md mb-3"></View>
          <View className="bg-gray-300 h-4 w-32 rounded-md"></View>
        </Animated.View>
      ))}
    </View>
  );
}