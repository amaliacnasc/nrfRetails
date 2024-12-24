import React from 'react';
import { View, Text } from 'react-native';

interface FlightInfoCardProps {
  date: string;
  description: string;
}

const FlightInfoCard: React.FC<FlightInfoCardProps> = ({ date, description }) => {
  return (
    <View className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
      <Text className="text-lg font-semibold text-gray-800 mb-2">{date}</Text>
      <Text className="text-gray-700">{description}</Text>
    </View>
  );
};

export default FlightInfoCard;