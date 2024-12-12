import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

import "../global.css";

export default function App() {
  return (
    <View className="flex-1 h-full items-center justify-center bg-black">
      <Text className='text-red-500'>Não ta funcionando!</Text>
      <StatusBar style="auto" />
    </View >
  );
}